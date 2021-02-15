import { MessageEmbed } from "discord.js";
import { client } from "..";
import { capitalizeWords } from "../functions/capitalizeWords";
import { formatTimestamp } from "../functions/formatTimestamp";
import { getChannel } from "../functions/getChannel";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { decor } from "../maps/emojiEnum";

module.exports = {
  name: "channel",
  aliases: ["ch"],
  usage: "[channel: Channel | Snowflake]",
  restrictions: {
    guildOnly: true,
  },
  async run(message, args: string[]) {
    const channel = await getChannel(message, args);
    if (!channel) return await message.channel.send("Unknown Channel!");
    const emb = new MessageEmbed();
    emb.setAuthor(
      `${channel.name}`,
      client.emojis.cache.get("798624246905569323")!.url
    );
    emb.addField(
      "❯ Channel Info",
      `${decor.Emojis.GEAR} **ID**: \`${channel.id}\`
${decor.Emojis.LINK} **Channel**: ${channel}
${decor.Emojis.CALENDAR_SPIRAL} **Created**: ${simpleGetLongAgo(
        channel.createdTimestamp
      )} ${formatTimestamp(channel.createdAt)}
${decor.Emojis.JIGSAW} **Type**: ${capitalizeWords(channel.type)}`
    );
    emb.addField(
      "❯ Invites",
      (await channel.fetchInvites()).size
        ? (await channel.fetchInvites())
            .array()
            .slice(0, 5)
            .map(
              (e) =>
                `[Invite](${e.url}) by ${e.inviter} ${formatTimestamp(
                  e.createdAt!
                )}`
            )
            .join("\n")
        : "None."
    );
    emb.setColor(Color.embed);
    await message.channel.send(emb);
  },
} as ICommand;