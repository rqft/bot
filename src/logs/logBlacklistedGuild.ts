import Discord from "discord.js";
import { formatID } from "../functions/formatID";
import { client } from "../index";
import { config } from "./config";

export function logBlacklistedGuild(guild: Discord.Guild) {
  config.logs.blacklist.guildBlocked.forEach((e) => {
    const ch = client.channels.cache.get(e) as Discord.TextChannel;
    ch.send(
      `:warning: Blacklisted Guild \`${guild.name}\` ${formatID(
        guild.id
      )} tried to add the bot`
    );
  });
}
