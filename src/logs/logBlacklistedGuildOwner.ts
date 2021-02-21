import Discord from "discord.js";
import { config } from "../config";
import { formatID } from "../functions/formatID";
import { client } from "../index";

export function logBlacklistedGuildOwner(
  guild: Discord.Guild,
  user: Discord.User
) {
  config.logs.blacklist.guildBlocked.forEach((e) => {
    const ch = client.channels.cache.get(e) as Discord.TextChannel;
    ch.send(
      `:warning: Blacklisted Guild \`${guild.name}\` ${formatID(
        guild.id
      )} owned by **${user}** tried to add the bot`
    );
  });
}
