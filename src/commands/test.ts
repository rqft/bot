import { MessageEmbed } from "discord.js";
import { client } from "..";
import { formatTimestamp } from "../functions/formatTimestamp";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "test",
  description: "TESTING",
  restrictions: {
    ownerOnly: true,
  },
  async run(message, args) {
    const unresolvedID = args[0]!.replace(/\D/g, "");
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
      `:pencil: **Name**: \`:${e.name}:\`
:link: **Emoji**: ${e}
:gear: **ID**: \`${e.id}\`
:calendar_spiral: **Created**: ${simpleGetLongAgo(
        e.createdTimestamp
      )} ${formatTimestamp(e.createdAt)}`
    );
    emb.addField(
      "❯ Server",
      `:film_frames: **Animated**: ${e.animated ? "Yes" : "No"}
:computer: **Uploaded to** \`${e.guild.name}\` by ${await e.fetchAuthor()}`
    );

    emb.setThumbnail(e.url);
    return await message.channel.send(emb);
  },
} as ICommand;
