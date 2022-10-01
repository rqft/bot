"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embeds = void 0;
const utils_1 = require("detritus-client/lib/utils");
const constants_1 = require("../constants");
var Embeds;
(function (Embeds) {
    function user(context, embed = new utils_1.Embed()) {
        embed.setColor(constants_1.Colours.EMBED);
        embed.setAuthor(context.user.tag, context.user.avatarUrl);
        return embed;
    }
    Embeds.user = user;
})(Embeds = exports.Embeds || (exports.Embeds = {}));
