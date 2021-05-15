import { Command, CommandClient } from "detritus-client";
import fetch from "node-fetch";
import { CustomEmojis } from "../../enums/customEmojis";
import { findGuildEmoji } from "../../functions/findEmoji";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { limit } from "../../functions/limit";
import { CustomError } from "../../globals";
import { BaseCommand } from "../basecommand";
interface Definition {
  definition: string;
  permalink: string;
  thumbs_up: number;
  sound_urls: string[];
  author: string;
  defid: number;
  current_vote: string;
  written_on: string;
  example: string;
  thumbs_down: number;
  word: string;
}
export default class UrbanCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "query",
      required: true,
      name: "urban",
      args: [
        {
          name: "page",
          type: Number,
          default: 1,
        },
      ],
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const request = await fetch(
      `http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(
        args.query
      )}`
    );
    if (!request.ok)
      throw new CustomError("Something went wrong while fetching the request");
    const { list } = await request.json();
    if (!list.length) throw new CustomError("No results found");

    const page: Definition = list[(args.page ?? 1) - 1] ?? list[0];
    const embed = generateEmbed({
      user: context.user,
      otherText: [`(${args.page ?? 1}/${list.length})`],
    });

    if (page.author) embed.setAuthor(page.author);

    embed.setDescription(limit(page.definition, 500));

    if (page.example) embed.addField("Examples", limit(page.example, 500));

    embed.setAuthor(
      page.word,
      findGuildEmoji(
        page.thumbs_up > page.thumbs_down
          ? CustomEmojis.GUI_UP_ARROW
          : CustomEmojis.GUI_DOWN_ARROW
      )!.url,
      page.permalink
    );

    if (page.sound_urls.length) {
      embed.addField(
        `Listen`,
        page.sound_urls
          .slice(0, 10)
          .map((j) => `[Audio #${page.sound_urls.indexOf(j) + 1}](${j})`)
          .join(", ") +
          (page.sound_urls.length > 1
            ? `\nand ${page.sound_urls.length - 5} more...`
            : ""),
        true
      );
    }

    embed.addField(
      "Votes",
      `${CustomEmojis.GUI_UP_ARROW} \`${page.thumbs_up}\` | ${CustomEmojis.GUI_DOWN_ARROW} \`${page.thumbs_down}\``
    );

    console.log(embed.fields?.toArray());
    context.editOrReply({ embed });
  }
}
