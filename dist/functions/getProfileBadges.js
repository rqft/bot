"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileBadges = void 0;
const discord_js_1 = require("discord.js");
const profileBadge_1 = require("../maps/profileBadge");
function getProfileBadges(userResolvable, showIcons = true) {
    const badges = [];
    const user = userResolvable instanceof discord_js_1.GuildMember
        ? userResolvable.user
        : userResolvable;
    user.flags?.toArray().forEach((e) => {
        const get = profileBadge_1.profileBadgeMap.get(e);
        badges.push(`${showIcons ? get?.icon : ""} **${get?.text}**`);
    });
    if (user.bot)
        badges.unshift(`${showIcons ? ":gear:" : ""} **Bot**`);
    if (badges.length == 0)
        return ["No Badges"];
    return badges;
}
exports.getProfileBadges = getProfileBadges;
