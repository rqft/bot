import { Snowflake } from "discord.js";
import { readFileSync, writeFileSync } from "fs";
export function uploadConfig(guildId: Snowflake, conf: object) {
  const raw = readFileSync("src\\guilds.json");
  const data = JSON.parse(raw.toString());
  data[guildId] = conf;
  writeFileSync("src\\guilds.json", data);
}
