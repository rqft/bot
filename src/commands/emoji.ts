import { MessageEmbed } from "discord.js";
import { client } from "..";
import { formatTimestamp } from "../functions/formatTimestamp";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { decor } from "../maps/emojiEnum";

module.exports = {
  name: "emoji",
  aliases: ["e", "emote"],
  description: "Emojis!",
  async run(message, args) {
    const unresolvedID = args[0]!.replace(/\D/g, "").toLowerCase();
    var e = client.emojis.cache.get(unresolvedID)!;
    if (!e) {
      const extension = args[0]?.replace(/[<>]/g, "").startsWith("a")
        ? ".gif"
        : ".png";
      console.log(args[0]?.replace(/[<>]/g, ""));
      const baseURL = "https://cdn.discordapp.com/emojis/";
      return await message.channel.send("", {
        files: [
          {
            name: "emoji" + extension,
            attachment: baseURL + unresolvedID + extension,
          },
        ],
      });
    }
    const emb = new MessageEmbed();
    emb.setColor(Color.embed);
    emb.addField(
      "❯ Emoji Info",
      `${decor.Emojis.PENCIL} **Name**: \`:${e.name}:\`
${decor.Emojis.LINK} **Emoji**: ${e}
${decor.Emojis.GEAR} **ID**: \`${e.id}\`
${decor.Emojis.CALENDAR_SPIRAL} **Created**: ${simpleGetLongAgo(
        e.createdTimestamp
      )} ago ${formatTimestamp(e.createdAt)}`
    );
    emb.addField(
      "❯ Server",
      `${decor.Emojis.FILM_FRAMES} **Animated**: ${e.animated ? "Yes" : "No"}
${decor.Emojis.COMPUTER} **Uploaded to** \`${
        e.guild.name
      }\` by ${await e.fetchAuthor()}`
    );

    emb.setThumbnail(e.url);
    return await message.channel.send(emb);
  },
} as ICommand;
