"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botBadgeMap = void 0;
const config_1 = require("../config");
const botBadgeMap = new Map();
exports.botBadgeMap = botBadgeMap;
config_1.config.bot.ownerIds.forEach((e) => {
    botBadgeMap.set(e, [
        {
            icon: "<:IconGui_OwnerCrown:799657143719952415>",
            text: "Bot Owner",
        },
    ]);
});
botBadgeMap.set(config_1.config.bot.id, [
    {
        icon: "<:Hallucinate:800092998590529557>",
        text: "System",
    },
]);
botBadgeMap.set("697071919639560254", [
    {
        icon: "<:mejiIsACutieAndHeCantDenyIt:805630177475559444>",
        text: "Cute",
    },
]);
