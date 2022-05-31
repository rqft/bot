"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = exports.DefaultOptions = void 0;
const command_1 = require("detritus-client/lib/command");
const constants_1 = require("detritus-client/lib/constants");
const error_1 = require("../../tools/error");
const markdown_1 = require("../../tools/markdown");
const tools_1 = require("../../tools/tools");
exports.DefaultOptions = {
    triggerTypingAfter: 1000,
    ratelimits: [
        { duration: 2500, limit: 3, type: constants_1.CommandRatelimitTypes.USER },
        { duration: 5000, limit: 10, type: constants_1.CommandRatelimitTypes.CHANNEL },
        { duration: 10000, limit: 20, type: constants_1.CommandRatelimitTypes.GUILD },
    ],
};
class BaseCommand extends command_1.Command {
    use;
    expensive = false;
    metadata;
    constructor(client, options) {
        console.log("creating", options.name);
        super(client, Object.assign({}, exports.DefaultOptions, options));
        this.metadata = options.metadata;
    }
    get commandUsage() {
        const metadata = this.metadata;
        if (typeof metadata.usage === "string") {
            return `${this.fullName} ${metadata.usage}`.trim();
        }
        return this.fullName;
    }
    async onBefore() {
        this.use = new Date();
        console.log(`recieved ${this.fullName} in ${Date.now() - this.use.getTime()}ms`);
        return true;
    }
    async onBeforeRun(context) {
        console.log(`processing ${this.fullName} in ${Date.now() - this.use.getTime()}ms`);
        await (0, tools_1.editOrReply)(context, "ok, processing" + (this.expensive ? " (this may take a while)" : ""));
        return true;
    }
    async onCancelRun(context) {
        console.log(`cancelled ${this.fullName} in ${Date.now() - this.use.getTime()}ms`);
        return await (0, tools_1.editOrReply)(context, markdown_1.Markdown.Format.codeblock(this.commandUsage).toString());
    }
    async onPermissionsFail(context, failed) {
        const permissions = (0, tools_1.permissionsErrorList)(failed);
        return await (0, tools_1.editOrReply)(context, `hey you need ${permissions.join(", ")} to run this`);
    }
    async onPermissionsFailClient(context, failed) {
        const permissions = (0, tools_1.permissionsErrorList)(failed);
        return await (0, tools_1.editOrReply)(context, `hey i need ${permissions.join(", ")} to run this`);
    }
    async onRatelimit(context, ratelimits) {
        if (!context.canReply) {
            return;
        }
        let replied = false;
        for (const { item, ratelimit, remaining } of ratelimits) {
            if (remaining < 1000 || replied || item.replied) {
                item.replied = true;
                continue;
            }
            replied = item.replied = true;
            let noun = "you funny people are";
            switch (ratelimit.type) {
                case constants_1.CommandRatelimitTypes.CHANNEL: {
                    noun = "this channel is";
                    break;
                }
                case constants_1.CommandRatelimitTypes.GUILD: {
                    noun = "this server is";
                    break;
                }
                case constants_1.CommandRatelimitTypes.USER: {
                    noun = "you are";
                    break;
                }
            }
            const content = `${noun} going really fast please slow down :( (wait ${markdown_1.Markdown.toTimeString(remaining, undefined, false)})`;
            return await (0, tools_1.editOrReply)(context, content);
        }
    }
    async onRunError(context, _args, error) {
        await (0, tools_1.editOrReply)(context, error_1.Err.from(error).toThrown());
        throw error;
    }
    async onTypeError(context, _args, errors) {
        const description = [
            "hey u have some wrong inputs, might want to fix them :D\n",
        ];
        const store = {};
        for (const key in errors) {
            const value = errors[key];
            const message = value.message;
            if (message in store) {
                description.push(`${key}: same as ${store[message]}`);
            }
            else {
                description.push(`${key}: ${message}`);
            }
            store[message] = key;
        }
        return await (0, tools_1.editOrReply)(context, description.join("\n"));
    }
}
exports.BaseCommand = BaseCommand;
