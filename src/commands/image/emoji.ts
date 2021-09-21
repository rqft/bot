import { Command, CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { Emoji } from "detritus-client/lib/structures";
import { client } from "../..";
import { CustomEmojis } from "../../enums/customEmojis";
import { Emojis } from "../../enums/emojis";
import { capitalizeWords } from "../../functions/capitalizeWords";
import { findEmoji } from "../../functions/findEmoji";
import { formatTimestamp } from "../../functions/formatTimestamp";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { messages } from "../../messages";
import { BaseCommand } from "../basecommand";

export default class EmojisCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "emoji",
      required: true,
      name: "emoji",
      aliases: ["e"],
      args: [
        {
          name: "size",
          choices: [16, 32, 64, 128, 256, 512, 1024, 2048, 4096],
          default: 512,
          type: "number",
        },
      ],
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    await context.editOrReply("ok, finding");
    const emoji = findEmoji(args.emoji);
    console.log(emoji);
    if (!emoji)
      return await context.editOrReply(messages.targeting.not_found.emoji);
    const emb = generateEmbed({
      user: context.user,
    });
    var item = args.emoji;

    var found: Emoji | null = null;
    if (emoji.id) {
      found = client.emojis.find((v) => v.id === emoji.id)!;
      item = `${found.name} (${found.id}) from ${found.guild!.name}`;
    }
    emb.setAuthor(`${capitalizeWords(emoji.type)} - ${item}`, emoji.url);
    if (found !== null) {
      const data = [];
      if (found.user)
        data.push(`${CustomEmojis.GUI_LIBRARY} **Uploaded by**: ${found.user}`);
      data.push(
        `${CustomEmojis.GUI_ADD_REACTION} **Identifier**: \`${
          found.animated ? "a:" : ""
        }${found.name}:${found.id}\``
      );
      if (found.createdAtUnix)
        data.push(
          `${CustomEmojis.GUI_SLOWMODE} **Created**: ${simpleGetLongAgo(
            found.createdAtUnix
          )} ago ${formatTimestamp(found.createdAtUnix)}`
        );
      data.push(
        `${Emojis.LINK} **URL**: ${[ImageFormats.GIF, ImageFormats.PNG]
          .map((v) => `[${v.toUpperCase()}](${found!.urlFormat(v)})`)
          .join(" | ")}`
      );
      emb.setDescription(data.join("\n"));
    }

    emb.setImage(emoji.url);
    context.editOrReply({
      embed: emb,
    });
  }
}
