import { Guild } from "discord.js";
import { config } from "../config";
import { guildFeatureMap } from "../maps/guildFeature";

export function getGuildFeatures(guild: Guild, showIcons: boolean = true) {
  const feat = [];
  if (guild.id == config.global.mainServerID)
    feat.push(
      `${
        showIcons ? "<:IconGui_OwnerCrown:799657143719952415>" : ""
      } Bot Server`
    );

  if (guild.me)
    feat.push(
      `${
        showIcons ? "<:Hallucinate:800092998590529557>" : ""
      } Uses Hallucinate <3`
    );

  guild.features.forEach((element) => {
    feat.push(
      `${showIcons ? guildFeatureMap.get(element)?.icon : ""} ${
        guildFeatureMap.get(element)?.text
      }`
    );
  });
  return feat.length !== 0 ? feat.sort().join("\n") : "None";
}
