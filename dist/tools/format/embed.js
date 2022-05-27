"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.card = exports.image = exports.brand = exports.user = void 0;
const detritus_client_1 = require("detritus-client");
const structures_1 = require("detritus-client/lib/structures");
const v2_1 = require("imagescript/v2");
const pariah_1 = require("pariah");
const constants_1 = require("../../constants");
const error_1 = require("../error");
const tools_1 = require("../tools");
function user(context, embed = new detritus_client_1.Utils.Embed()) {
    embed.setAuthor(context.user.tag, context.user.avatarUrl, context.user.jumpLink);
    embed.setColor(constants_1.Colours.EMBED);
    return embed;
}
exports.user = user;
function brand(context, brand, embed = new detritus_client_1.Utils.Embed()) {
    const self = user(context, embed);
    if (brand) {
        self.setFooter(`${constants_1.BrandNames[brand]}`, constants_1.BrandIcons[brand].toString());
        self.setColor(constants_1.BrandColours[brand]);
    }
    return self;
}
exports.brand = brand;
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
    const footer = [image.filename];
    const imagescript = (0, v2_1.load)(input);
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
exports.image = image;
function card(_context, text, embed = new detritus_client_1.Utils.Embed()) {
    embed.setColor(constants_1.Colours.EMBED);
    embed.setDescription(text);
    return embed;
}
exports.card = card;
