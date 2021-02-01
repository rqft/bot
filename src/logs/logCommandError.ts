import Discord from "discord.js";
import { formatID } from "../functions/formatID";
import { client } from "../index";
import { config } from "./config";

export function logCommandError(message: Discord.Message, error: Error) {
  config.logs.commands.onError.keys.forEach((e) => {
    const ch = client.channels.cache.get(e) as Discord.TextChannel;
    const channelName = message.channel.type == "dm" ? "DMs" : message.channel;
    const guildName = message.guild ? `on \`${message.guild.name}\`` : "";
    ch.send(
      `:x: **${message.author.tag}** ${formatID(
        message.author.id
      )} tried to use command \`${
        message.cleanContent
      }\` in ${channelName} ${formatID(message.channel.id)} ${guildName} ${
        message.guild ? formatID(message.guild.id) : ""
      } and caused an error.
\`\`\`ts
${error}
\`\`\``
    );
  });
}
