import { Guild } from "discord.js";
import {
  guildVoiceRegionMap,
  VoiceRegionString,
} from "../maps/guildVoiceRegion";

export function getGuildVoiceRegion(guild: Guild, showFlag: boolean = true) {
  const reg = guildVoiceRegionMap.get(guild.region as VoiceRegionString);
  if (!reg) return "Unknown Voice Region";
  return `${showFlag ? reg.icon : ""} ${reg.text}`;
}
