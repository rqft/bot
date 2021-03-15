import { Snowflake } from "discord.js";
import { readFileSync } from "fs";
import { IConfig } from "../interfaces/IConfig";
export function getConfig(guildId: Snowflake) {
  const raw = readFileSync("src\\guilds.json");
  const data = JSON.parse(raw.toString());
  const guildConfig = data[guildId];
  return (guildConfig ?? {
    guildId,
    levels: {},
    modules: {
      commands: {
        prefixes: ["!"],
      },
    },
  }) as IConfig;
}
