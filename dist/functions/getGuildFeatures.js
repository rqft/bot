"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuildFeatures = void 0;
const guildFeature_1 = require("../maps/guildFeature");
function getGuildFeatures(guild) {
    const feat = [];
    if (guild.me) {
        feat.push("<:Hallucinate:800092998590529557> Uses Hallucinate (ty)");
    }
    guild.features.forEach((element) => {
        feat.push(guildFeature_1.guildFeatureMap.get(element));
    });
    return feat.length !== 0 ? feat.join("\n") : "None";
}
exports.getGuildFeatures = getGuildFeatures;
