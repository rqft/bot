import { Guild } from "discord.js";
import { guildFeatureMap } from "../maps/guildFeature";

export function getGuildFeatures(guild: Guild, showIcons: boolean = true) {
  const feat = [];
  if (guild.me) {
    feat.push("<:Hallucinate:800092998590529557> Uses Hallucinate (ty)");
  }
  guild.features.forEach((element) => {
    feat.push(
      `${showIcons ? guildFeatureMap.get(element)?.icon : ""} ${
        guildFeatureMap.get(element)?.text
      }`
    );
  });
  return feat.length !== 0 ? feat.join("\n") : "None";
}
