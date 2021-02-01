import Discord from "discord.js";
import { config } from "../config";
import { formatID } from "../functions/formatID";
import { client } from "../index";

export function logBlacklistedUserAction(message: Discord.Message) {
  config.logs.blacklist.userBlocked.forEach((e) => {
    const ch = client.channels.cache.get(e) as Discord.TextChannel;
    const channelName = message.channel.type == "dm" ? "DMs" : message.channel;
    const guildName = message.guild ? `on \`${message.guild.name}\`` : "";
    ch.send(
      `:warning: Blacklisted User **${message.author.tag}** ${formatID(
        message.author.id
      )} tried to use command \`${
        message.cleanContent
      }\` in ${channelName} ${formatID(message.channel.id)} ${guildName} ${
        message.guild ? formatID(message.guild.id) : ""
      }`
    );
  });
}
