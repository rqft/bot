"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuildVoiceRegion = void 0;
const guildVoiceRegion_1 = require("../maps/guildVoiceRegion");
function getGuildVoiceRegion(guild, showFlag = true) {
    const reg = guildVoiceRegion_1.guildVoiceRegionMap.get(guild.region);
    if (!reg)
        return "Unknown Voice Region";
    return `${showFlag ? reg.icon : ""} ${reg.text}`;
}
exports.getGuildVoiceRegion = getGuildVoiceRegion;
