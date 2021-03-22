import { SnowflakeUtil } from "discord.js";

export function replacer(
  base: string,
  replacers: Map<string, any> | [string, any][]
) {
  for (const [key, value] of replacers) {
    base = base.split(key).join(value);
  }
  return base;
}
SnowflakeUtil;
