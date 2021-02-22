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
            text: "Global Admin",
        },
    ]);
});
const githubPeople = ["504698587221852172", "533757461706964993"];
githubPeople.forEach((e) => {
    botBadgeMap.set(e, botBadgeMap.get(e).concat([
        {
            icon: "<:GitHub:805634226921013258>",
            text: "Github Person",
        },
    ]));
});
botBadgeMap.set(config_1.config.bot.application.ownerId, botBadgeMap.get(config_1.config.bot.application.ownerId).concat([
    {
        icon: "\uD83E\uDDD1\u200D\uD83D\uDCBB",
        text: "Developer",
    },
]));
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
botBadgeMap.set("411994935395614761", [
    {
        icon: "\uD83D\uDC4D",
        text: "ok",
    },
]);
botBadgeMap.set("706159423323635782", [
    {
        icon: "\uD83D\uDCA7",
        text: "funy watr person",
    },
]);
