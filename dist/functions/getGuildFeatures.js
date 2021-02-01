"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuildFeatures = void 0;
const guildFeature_1 = require("../maps/guildFeature");
function getGuildFeatures(guild, showIcons = true) {
    const feat = [];
    if (guild.me) {
        feat.push("<:Hallucinate:800092998590529557> Uses Hallucinate <3");
    }
    guild.features.forEach((element) => {
        feat.push(`${showIcons ? guildFeature_1.guildFeatureMap.get(element)?.icon : ""} ${guildFeature_1.guildFeatureMap.get(element)?.text}`);
    });
    return feat.length !== 0 ? feat.join("\n") : "None";
}
exports.getGuildFeatures = getGuildFeatures;
