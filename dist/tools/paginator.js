"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginator = exports.PageButtons = exports.PageButtonNames = exports.MIN_PAGE = exports.MAX_PAGE = void 0;
const detritus_client_1 = require("detritus-client");
const command_1 = require("detritus-client/lib/command");
const constants_1 = require("detritus-client/lib/constants");
const interaction_1 = require("detritus-client/lib/interaction");
const utils_1 = require("detritus-client/lib/utils");
const timers_1 = require("detritus-utils/lib/timers");
const util_1 = require("./util");
exports.MAX_PAGE = Number.MAX_SAFE_INTEGER;
exports.MIN_PAGE = 1;
var PageButtonNames;
(function (PageButtonNames) {
    PageButtonNames["CUSTOM"] = "custom";
    PageButtonNames["NEXT"] = "next";
    PageButtonNames["NEXT_LARGE"] = "next-large";
    PageButtonNames["PREVIOUS"] = "previous";
    PageButtonNames["PREVIOUS_LARGE"] = "previous-large";
    PageButtonNames["SHUFFLE"] = "shuffle";
    PageButtonNames["STOP"] = "stop";
})(PageButtonNames = exports.PageButtonNames || (exports.PageButtonNames = {}));
function label(data) {
    return { label: data };
}
exports.PageButtons = {
    [PageButtonNames.CUSTOM]: label("?"),
    [PageButtonNames.NEXT]: label(">"),
    [PageButtonNames.NEXT_LARGE]: label(">>"),
    [PageButtonNames.PREVIOUS]: label("<"),
    [PageButtonNames.PREVIOUS_LARGE]: label("<<"),
    [PageButtonNames.SHUFFLE]: label("*"),
    [PageButtonNames.STOP]: label("X"),
};
class Paginator {
    context;
    custom = {
        expire: 10000,
        isActive: false,
        timeout: new timers_1.Timeout(),
    };
    _isEphemeral;
    _message = null;
    buttons = Object.assign({}, exports.PageButtons);
    expires = 1 * (60 * 1000);
    page = exports.MIN_PAGE;
    pageLimit = exports.MAX_PAGE;
    pageSkipAmount = 10;
    pages;
    ratelimit = 250;
    ratelimitTimeout = new timers_1.Timeout();
    stopped = false;
    targets = [];
    onError;
    onExpire;
    onPage;
    onPageNumber;
    constructor(context, options) {
        this.context = context;
        this._message = options.message || null;
        if (options.isEphemeral !== undefined) {
            this.isEphemeral = options.isEphemeral;
        }
        if (Array.isArray(options.pages)) {
            this.pages = options.pages;
            this.pageLimit = this.pages.length;
        }
        else {
            if (options.pageLimit !== undefined) {
                this.pageLimit = Math.max(exports.MIN_PAGE, Math.min(options.pageLimit, exports.MAX_PAGE));
            }
        }
        if (options.page !== undefined) {
            this.page = Math.max(exports.MIN_PAGE, Math.min(options.page, exports.MAX_PAGE));
        }
        this.pageSkipAmount = Math.max(2, options.pageSkipAmount || this.pageSkipAmount);
        if (Array.isArray(options.targets)) {
            for (const target of options.targets) {
                if (typeof target === "string") {
                    this.targets.push(target);
                }
                else {
                    this.targets.push(target.id);
                }
            }
        }
        else {
            if (context instanceof detritus_client_1.Structures.Message) {
                this.targets.push(context.author.id);
            }
            else {
                this.targets.push(context.userId);
            }
        }
        if (!this.targets.length) {
            throw new Error("A userId must be specified in the targets array");
        }
        const buttons = Object.assign({}, exports.PageButtons, options.buttons);
        for (const key in exports.PageButtons) {
            this.buttons[key] = buttons[key];
        }
        this.onError = options.onError;
        this.onExpire = options.onExpire;
        this.onPage = options.onPage;
        this.onPageNumber = options.onPageNumber;
        Object.defineProperties(this, {
            _message: { enumerable: false },
            buttons: { enumerable: false },
            context: { enumerable: false },
            custom: { enumerable: false },
            onError: { enumerable: false },
            onExpire: { enumerable: false },
            onPage: { enumerable: false },
            onPageNumber: { enumerable: false },
        });
    }
    get components() {
        const components = new utils_1.Components({
            timeout: this.expires,
            onTimeout: this.onStop.bind(this),
            run: this.onButtonPress.bind(this),
        });
        if (!this.shouldHaveComponents || this.stopped) {
            return components;
        }
        components.createButton({
            customId: PageButtonNames.PREVIOUS,
            disabled: this.page === exports.MIN_PAGE,
            ...this.buttons[PageButtonNames.PREVIOUS],
        });
        components.createButton({
            customId: PageButtonNames.NEXT,
            disabled: this.page === this.pageLimit,
            ...this.buttons[PageButtonNames.NEXT],
        });
        components.createButton({
            customId: PageButtonNames.STOP,
            style: constants_1.MessageComponentButtonStyles.DANGER,
            ...this.buttons[PageButtonNames.STOP],
        });
        return components;
    }
    get channelId() {
        return this.context.channelId;
    }
    get id() {
        if (this.context instanceof interaction_1.InteractionContext) {
            return this.context.id;
        }
        else if (this.context instanceof command_1.Context) {
            return this.context.messageId;
        }
        else if (this.context instanceof detritus_client_1.Structures.Message) {
            return this.context.id;
        }
        return "";
    }
    get isEphemeral() {
        if (this._isEphemeral !== undefined) {
            return this._isEphemeral;
        }
        if (this.message) {
            return (this._isEphemeral = this.message.hasFlag(constants_1.MessageFlags.EPHEMERAL));
        }
        return false;
    }
    set isEphemeral(isEphemeral) {
        this._isEphemeral = isEphemeral;
    }
    get isLarge() {
        return false;
    }
    get message() {
        if (this._message) {
            return this._message;
        }
        if (this.context instanceof interaction_1.InteractionContext) {
            return (this._message = this.context.response);
        }
        return null;
    }
    set message(value) {
        this._message = value;
    }
    get messageId() {
        return this.message ? this.message.id : "";
    }
    get shouldHaveComponents() {
        return this.pageLimit !== exports.MIN_PAGE;
    }
    get randomPage() {
        if (this.pageLimit === exports.MIN_PAGE) {
            return this.pageLimit;
        }
        if (this.pageLimit === 2) {
            return this.page === exports.MIN_PAGE ? 2 : exports.MIN_PAGE;
        }
        let page = this.page;
        while (page === this.page) {
            page = Math.ceil(Math.random() * this.pageLimit);
        }
        return page;
    }
    addPage(page) {
        if (typeof this.onPage === "function") {
            throw new Error("Cannot add a page when onPage is attached to the paginator");
        }
        if (!Array.isArray(this.pages)) {
            this.pages = [];
        }
        this.pages.push(page);
        this.pageLimit = this.pages.length;
        return this;
    }
    canInteract(userId) {
        return this.targets.includes(userId) || this.context.client.isOwner(userId);
    }
    reset() {
        this.custom.timeout.stop();
        this.ratelimitTimeout.stop();
    }
    stop(clearButtons = true, context) {
        return this.onStop(null, clearButtons, context);
    }
    async clearCustomMessage(context) {
        this.custom.timeout.stop();
        if (this.custom.isActive) {
            if (this.custom.message) {
                if (!this.custom.message.deleted) {
                    try {
                        if (this.context instanceof interaction_1.InteractionContext) {
                            await this.context.deleteMessage(this.custom.message.id);
                        }
                        else {
                            await this.custom.message.delete();
                        }
                        await this.custom.message.delete();
                    }
                    catch (error) {
                        void 0;
                    }
                }
                this.custom.message = null;
            }
            this.custom.isActive = false;
            await this.updateButtons(context);
        }
    }
    async getPage(pageNumber) {
        let page;
        if (typeof this.onPage === "function") {
            page = await Promise.resolve(this.onPage(this.page));
        }
        else {
            if (Array.isArray(this.pages)) {
                pageNumber -= 1;
                if (pageNumber in this.pages) {
                    page = this.pages[pageNumber];
                }
            }
        }
        if (!page) {
            throw new Error(`Page ${pageNumber} not found`);
        }
        let files;
        let embed;
        if (Array.isArray(page) && page.length === 2) {
            embed = page[0];
            files = page[1];
        }
        else if (page instanceof utils_1.Embed) {
            embed = page;
        }
        else {
            throw new Error("Invalid Page Given");
        }
        return [embed, files];
    }
    async setPage(pageNumber, context) {
        pageNumber = Math.max(exports.MIN_PAGE, Math.min(pageNumber, this.pageLimit));
        if (pageNumber === this.page) {
            if (context) {
                await context.respond(constants_1.InteractionCallbackTypes.DEFERRED_UPDATE_MESSAGE);
            }
            return;
        }
        this.page = pageNumber;
        const [embed, files] = await this.getPage(this.page);
        if (context) {
            await context.editOrRespond({
                allowedMentions: { parse: [] },
                components: this.components,
                embed,
                files,
            });
        }
        else if (this.context instanceof interaction_1.InteractionContext) {
            await this.context.editOrRespond({
                allowedMentions: { parse: [] },
                components: this.components,
                embed,
                files,
            });
        }
        else if (this.message) {
            await this.message.edit({
                allowedMentions: { parse: [] },
                attachments: [],
                components: this.components,
                embed,
                files,
            });
        }
    }
    async updateButtons(context) {
        if (!this.stopped) {
            if (context) {
                await context.editOrRespond({
                    allowedMentions: { parse: [] },
                    components: this.components,
                });
            }
            else if (this.context instanceof interaction_1.InteractionContext) {
                await this.context.editResponse({
                    allowedMentions: { parse: [] },
                    components: this.components,
                });
            }
            else if (this.message) {
                await this.message.edit({
                    allowedMentions: { parse: [] },
                    components: this.components,
                });
            }
        }
    }
    async onButtonPress(context) {
        if (this.stopped) {
            await context.respond(constants_1.InteractionCallbackTypes.DEFERRED_UPDATE_MESSAGE);
            return;
        }
        if (!this.canInteract(context.userId)) {
            await context.respond(constants_1.InteractionCallbackTypes.DEFERRED_UPDATE_MESSAGE);
            return;
        }
        if (this.ratelimitTimeout.hasStarted) {
            await context.respond(constants_1.InteractionCallbackTypes.DEFERRED_UPDATE_MESSAGE);
            return;
        }
        try {
            switch (context.customId) {
                case PageButtonNames.CUSTOM:
                    {
                        if (this.custom.isActive) {
                            await this.clearCustomMessage(context);
                        }
                        else {
                            await this.clearCustomMessage();
                            this.custom.isActive = true;
                            await this.updateButtons(context);
                            this.custom.message = await context.createMessage({
                                content: "ok what page u want",
                                flags: this.isEphemeral ? constants_1.MessageFlags.EPHEMERAL : undefined,
                            });
                            this.custom.timeout.start(this.custom.expire, async () => {
                                await this.clearCustomMessage();
                            });
                        }
                    }
                    break;
                case PageButtonNames.NEXT:
                    {
                        await this.setPage(this.page + 1, context);
                    }
                    break;
                case PageButtonNames.NEXT_LARGE:
                    {
                        if (!this.isLarge) {
                            return;
                        }
                        await this.setPage(this.page + this.pageSkipAmount, context);
                    }
                    break;
                case PageButtonNames.PREVIOUS:
                    {
                        await this.setPage(this.page - 1, context);
                    }
                    break;
                case PageButtonNames.PREVIOUS_LARGE:
                    {
                        if (!this.isLarge) {
                            return;
                        }
                        await this.setPage(this.page - this.pageSkipAmount, context);
                    }
                    break;
                case PageButtonNames.SHUFFLE:
                    {
                        await this.setPage(this.randomPage, context);
                    }
                    break;
                case PageButtonNames.STOP:
                    {
                        await this.onStop(null, true, context, true);
                        if (this.context instanceof command_1.Context) {
                            const message = this.context.message;
                            if (!message.deleted && message.canDelete) {
                                try {
                                    await message.delete();
                                }
                                catch (error) {
                                    void 0;
                                }
                            }
                        }
                    }
                    break;
                default: {
                    return;
                }
            }
            this.ratelimitTimeout.start(this.ratelimit, () => {
                void 0;
            });
        }
        catch (error) {
            if (typeof this.onError === "function") {
                await Promise.resolve(this.onError(error, this));
            }
        }
    }
    async onMessage(message) {
        if (!this.custom.isActive || !this.canInteract(message.author.id)) {
            return;
        }
        const page = parseInt(message.content);
        if (!isNaN(page)) {
            await this.clearCustomMessage();
            await this.setPage(page);
            if (message.canDelete) {
                try {
                    await message.delete();
                }
                catch (error) {
                    void 0;
                }
            }
        }
    }
    async onStop(error, clearButtons = true, context, deleteMessage) {
        this.reset();
        if (!this.stopped) {
            this.stopped = true;
            try {
                if (error) {
                    if (typeof this.onError === "function") {
                        await Promise.resolve(this.onError(error, this));
                    }
                }
                if (typeof this.onExpire === "function") {
                    await Promise.resolve(this.onExpire(this));
                }
            }
            catch (error) {
                if (typeof this.onError === "function") {
                    await Promise.resolve(this.onError(error, this));
                }
            }
            if (deleteMessage) {
                if (this.message && !this.message.deleted) {
                    try {
                        if (this.context instanceof interaction_1.InteractionContext) {
                            await this.context.deleteMessage(this.message.id);
                        }
                        else {
                            await this.message.delete();
                        }
                    }
                    catch (error) {
                        void 0;
                    }
                }
            }
            else if (clearButtons) {
                if (context) {
                    const [embed, files] = await this.getPage(this.page);
                    await context.editOrRespond({
                        allowedMentions: { parse: [] },
                        components: [],
                        embed,
                        files,
                    });
                }
                else if (this.message &&
                    !this.message.deleted &&
                    this.message.components.length) {
                    try {
                        if (this.context instanceof interaction_1.InteractionContext) {
                            await this.context.editMessage(this.message.id, {
                                components: [],
                            });
                        }
                        else {
                            await this.message.edit({ components: [] });
                        }
                    }
                    catch (error) {
                        void 0;
                    }
                }
            }
            await this.clearCustomMessage();
            this.onError = undefined;
            this.onExpire = undefined;
            this.onPage = undefined;
            this.onPageNumber = undefined;
        }
    }
    async start() {
        if (typeof this.onPage !== "function" &&
            !(this.pages && this.pages.length)) {
            throw new Error("Paginator needs an onPage function or at least one page added to it");
        }
        if (this.isEphemeral && !(this.context instanceof interaction_1.InteractionContext)) {
            this.isEphemeral = false;
        }
        let message = null;
        if (this.context instanceof interaction_1.InteractionContext) {
            const [embed, files] = await this.getPage(this.page);
            await this.context.editOrRespond({
                components: this.components,
                embed,
                files,
                flags: this.isEphemeral ? constants_1.MessageFlags.EPHEMERAL : undefined,
            });
            message = this.message;
        }
        else if (this.message) {
            message = this.message;
            if (message.canEdit) {
                const [embed, files] = await this.getPage(this.page);
                message = this.message = await message.edit({
                    attachments: [],
                    components: this.components,
                    embed,
                    files,
                });
            }
        }
        else {
            if (!this.context.canReply) {
                throw new Error("Cannot create messages in this channel");
            }
            const [embed, files] = await this.getPage(this.page);
            if (this.context instanceof command_1.Context) {
                message = this._message = await (0, util_1.respond)(this.context, {
                    components: this.components,
                    embed,
                    files,
                });
            }
            else {
                message = this._message = await this.context.reply({
                    components: this.components,
                    embed,
                    files,
                });
            }
        }
        this.reset();
        return message;
    }
}
exports.Paginator = Paginator;
