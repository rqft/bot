"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuildFeatures = void 0;
const config_1 = require("../config");
const guildFeature_1 = require("../maps/guildFeature");
function getGuildFeatures(guild, showIcons = true) {
    const feat = [];
    if (guild.id == config_1.config.global.mainServerID)
        feat.push(`${showIcons ? "<:IconGui_OwnerCrown:799657143719952415>" : ""} Bot Server`);
    if (guild.me)
        feat.push(`${showIcons ? "<:Hallucinate:800092998590529557>" : ""} Uses Hallucinate`);
    guild.features.forEach((element) => {
        feat.push(`${showIcons ? guildFeature_1.guildFeatureMap.get(element)?.icon : ""} ${guildFeature_1.guildFeatureMap.get(element)?.text}`);
    });
    return feat.length !== 0 ? feat.sort().join("\n") : "None";
}
exports.getGuildFeatures = getGuildFeatures;
