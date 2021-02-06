import { GuildChannel, MessageEmbed } from "discord.js";
import { client } from "..";
import { capitalizeWords } from "../functions/capitalizeWords";
import { formatTimestamp } from "../functions/formatTimestamp";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "channel",
  aliases: ["ch"],
  usage: "[channel: Channel | Snowflake]",
  restrictions: {
    guildOnly: true,
  },
  async run(message, args: string[]) {
    var res = args.join(" ")?.normalize()!;
    if (!res) res = message.channel.id;
    if (res?.toLowerCase() == "here") res = message.channel.id;
    if (res?.toLowerCase() == "random") {
      if (!message.guild) {
        return await message.channel.send(
          "You need to be in a server to run this!"
        );
      }
      res = message.guild.channels.cache.random().id;
    }
    var unresolvedID = args.join(" ").length ? res : message.author.id;
    if (res.match(/<@!?(\d+)>/g)?.length !== 0)
      unresolvedID = res.replace(/[<@!>]/g, "");
    var channel: GuildChannel | null = null;
    try {
      channel = message.guild?.channels.cache.find(
        (e) =>
          e.name.toLowerCase().normalize() == unresolvedID ||
          e.id == unresolvedID ||
          `${e}` == unresolvedID ||
          message.guild?.members.cache.get(e.id)?.nickname == unresolvedID
      )!;
    } catch (error) {}
    if (!channel) {
      return await message.channel.send("Unknown User");
    }
    const emb = new MessageEmbed();
    emb.setAuthor(
      `${channel.name}`,
      client.emojis.cache.get("798624246905569323")!.url
    );
    emb.addField(
      "❯ Channel Info",
      `:gear: **ID**: \`${channel.id}\`
:link: **Channel**: ${channel}
:calendar_spiral: **Created**: ${simpleGetLongAgo(
        channel.createdTimestamp
      )} ${formatTimestamp(channel.createdAt)}
:jigsaw: **Type**: ${capitalizeWords(channel.type)}`
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
