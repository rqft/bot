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
    async function image(context, value, filename, embed = Embeds.user(context)) {
        const out = {};
        const content = await (0, imagescript_1.decode)(value);
        const footer = [];
        footer.push((0, util_1.formatBytes)(Buffer.byteLength(value.buffer)));
        footer.push(`${content.width}x${content.height}`);
        let fmt = 'png';
        if (content instanceof imagescript_1.GIF) {
            fmt = 'gif';
            footer.push(`${content.length} frames`);
        }
        const name = `${filename}.${fmt}`;
        footer.unshift(name);
        embed.setImage(`attachment://${name}`);
        embed.setFooter(footer.join(', '));
        out.embeds = [embed];
        out.files = [{ filename: name, value }];
        return out;
    }
    Embeds.image = image;
})(Embeds = exports.Embeds || (exports.Embeds = {}));
