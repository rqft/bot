import { Guild } from "discord.js";
import { config } from "../config";
import { CustomEmojis } from "../maps/customEmojis";
import { guildFeatureMap } from "../maps/guildFeature";

export function getGuildFeatures(guild: Guild, showIcons: boolean = true) {
  const feat = [];
  if (guild.id == config.global.mainServerID)
    feat.push(`${showIcons ? CustomEmojis.GUI_OWNERCROWN : ""} Bot Server`);

  if (guild.me)
    feat.push(
      `${showIcons ? CustomEmojis.BOT_HALLUCINATE : ""} Uses Hallucinate`
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
