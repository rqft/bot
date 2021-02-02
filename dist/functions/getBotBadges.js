"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBotBadges = void 0;
const botBadge_1 = require("../maps/botBadge");
function getBotBadges(user, showIcons = true) {
    const badges = botBadge_1.botBadgeMap
        .get(user.id)
        ?.map((e) => `${showIcons ? e.icon : ""} ${e.text}`);
    return badges ?? "No Bot Badges";
}
exports.getBotBadges = getBotBadges;
