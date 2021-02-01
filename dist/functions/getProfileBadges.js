"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileBadges = void 0;
const profileBadge_1 = require("../maps/profileBadge");
function getProfileBadges(user, showIcons = true) {
    const badges = [];
    user.flags?.toArray().forEach((e) => {
        const get = profileBadge_1.profileBadgeMap.get(e);
        badges.push(`${showIcons ? get?.icon : ""} ${get?.text}`);
    });
    if (user.bot)
        badges.unshift(`${showIcons ? ":gear:" : ""} Bot`);
    if (badges.length == 0)
        return ["No Badges"];
    return badges;
}
exports.getProfileBadges = getProfileBadges;
