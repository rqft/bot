"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embed = void 0;
const detritus_client_1 = require("detritus-client");
const structures_1 = require("detritus-client/lib/structures");
const v2_1 = require("imagescript/v2");
const pariah_1 = require("pariah");
const constants_1 = require("../../constants");
const error_1 = require("../error");
const tools_1 = require("../tools");
var Embed;
(function (Embed) {
    function user(context, embed = new detritus_client_1.Utils.Embed()) {
        embed.setAuthor(context.user.tag, context.user.avatarUrl, context.user.jumpLink);
        embed.setColor(constants_1.Colours.EMBED);
        if (context.metadata) {
            if (context.metadata.page) {
                embed.setFooter(`Page ${context.metadata.page}/${context.metadata.pageLimit}`);
            }
        }
        return embed;
    }
    Embed.user = user;
    function brand(context, brand, embed = new detritus_client_1.Utils.Embed()) {
        const self = user(context, embed);
        const footer = [];
        let icon = null;
        if (context.metadata) {
            if (context.metadata.page) {
                footer.push(`Page ${context.metadata.page}/${context.metadata.pageLimit}`);
            }
        }
        if (brand) {
            footer.push(`${constants_1.BrandNames[brand]}`);
            icon = constants_1.BrandIcons[brand].toString();
            self.setColor(constants_1.BrandColours[brand]);
        }
        if (footer.length) {
            self.setFooter(footer.join(", "), icon);
        }
        return self;
    }
    Embed.brand = brand;
    async function image(context, input, name, ubrand) {
        if (input instanceof ArrayBuffer) {
            const buf = Buffer.alloc(input.byteLength);
            const view = new Uint8Array(input);
            for (let index = 0; index < buf.length; ++index) {
                buf[index] = view[index];
            }
            input = buf;
        }
        if (input instanceof structures_1.Attachment) {
            input = input.url;
        }
        if (typeof input === "string") {
            input = new URL(input);
        }
        if (input instanceof URL) {
            input = (await new pariah_1.Pariah(input).buffer("/")).payload;
        }
        const decoder = new TextDecoder();
        const txt = decoder.decode(input);
        if (txt.match(/^\w+$/g)) {
            switch (txt) {
                case "NO_FACES_DETECTED": {
                    throw new error_1.Err("No faces detected");
                }
                default: {
                    throw new error_1.Err(txt);
                }
            }
        }
        const image = await (0, tools_1.store)(input, name);
        if (!image.url) {
            throw new error_1.Err("Failed to store image");
        }
        const embed = brand(context, ubrand);
        embed.setColor(constants_1.Colours.EMBED);
        const footer = [];
        if (context.metadata) {
            if (context.metadata.page) {
                footer.push(`Page ${context.metadata.page}/${context.metadata.pageLimit}`);
            }
        }
        footer.push(image.filename);
        let imagescript = null;
        try {
            imagescript = (0, v2_1.load)(input);
        }
        catch {
            throw new error_1.Err("Failed to load image");
        }
        if (imagescript === null) {
            throw new error_1.Err("Failed to load image");
        }
        if (imagescript instanceof v2_1.Animation) {
            footer.push(`${imagescript.frames.length} frames`);
        }
        if (image.size) {
            footer.push(`${image.width}x${image.height} (${(0, tools_1.formatBytes)(image.size, 2, true)})`);
        }
        embed.setFooter(footer.join(", "));
        embed.setImage(image.url);
        return embed;
    }
    Embed.image = image;
    function card(_context, text, embed = new detritus_client_1.Utils.Embed()) {
        embed.setColor(constants_1.Colours.EMBED);
        embed.setDescription(text);
        return embed;
    }
    Embed.card = card;
})(Embed = exports.Embed || (exports.Embed = {}));
