import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { PxlApi } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Secrets } from "../../../secrets";
import { BaseCommand } from "../basecommand";
export interface PxlWebSearchArgs {
  query: string;
}
export default class PxlWebSearchCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "web-search",
      aliases: ["websearch"],

      label: "query",
      type: "string",
      required: true,
    });
  }
  async run(context: Command.Context, args: PxlWebSearchArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);

    const webSearch = await pxl.webSearch(args.query);
    const embed = createBrandEmbed(Brand.PXL_API, context);
    {
      const description: Array<string> = [];
      const { results } = webSearch;
      results.forEach((value, index) => {
        if (index > 5) return;
        description.push(
          `${Markup.bold(`[${value.title}](${value.url})`)}\n${Markup.italics(
            value.description,
            {
              limit: 200,
            }
          )}\n`
        );
      });

      embed.setDescription(description.join("\n"));
    }

    {
      const description: Array<string> = [];
      const { news } = webSearch;

      news.forEach((value, index) => {
        if (index > 5) return;
        description.push(
          `${Markup.bold(`[${value.title}](${value.url})`)}\n${Markup.italics(
            value.description,
            {
              limit: 200,
            }
          )}\n`
        );
      });
      if (description.length)
        embed.addField("News Results", description.join("\n"));
    }

    {
      const description: Array<string> = [];
      const { images } = webSearch;
      images.forEach((value, index) => {
        if (index > 5) return;
        description.push(`[${new URL(value).hostname}](${value})`);
      });
      if (images.length) embed.addField("Images", description.join(", "));
    }

    return await context.editOrReply({ embed });
  }
}
