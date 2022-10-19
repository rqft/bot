"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embeds = void 0;
const utils_1 = require("detritus-client/lib/utils");
const imagescript_1 = require("imagescript");
const constants_1 = require("../constants");
const util_1 = require("./util");
var Embeds;
(function (Embeds) {
    function user(context, embed = new utils_1.Embed()) {
        embed.setColor(constants_1.Colours.Embed);
        embed.setAuthor(context.user.tag, context.user.avatarUrl);
        return embed;
    }
    Embeds.user = user;
    async function image(context, value, filename) {
        const out = {};
        const content = await (0, imagescript_1.decode)(value);
        const footer = [];
        footer.push((0, util_1.formatBytes)(Buffer.byteLength(value.buffer)));
        footer.push(`${content.width}x${content.height}`);
        if (content instanceof imagescript_1.GIF) {
            footer.push(`${content.length} frames`);
        }
        const embed = user(context);
        embed.setImage(`attachment://${filename}`);
        embed.setFooter(footer.join(', '));
        out.embeds = [embed];
        out.files = [{ filename, value }];
        return out;
    }
    Embeds.image = image;
})(Embeds = exports.Embeds || (exports.Embeds = {}));
