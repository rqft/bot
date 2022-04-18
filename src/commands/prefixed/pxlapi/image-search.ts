import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Paginator } from "../../../functions/paginator";
import { Secrets } from "../../../secrets";
import { BaseCommand, ToolsMetadata } from "../basecommand";
export interface PxlImageSearchArgs {
  query: string;
  page: number;
}
export default class PxlImageSearchCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image-search",
      aliases: ["imagesearch", "img"],

      label: "query",
      type: "string",
      required: true,

      args: [{ name: "page", type: "number", default: 1, required: false }],
      metadata: ToolsMetadata("Search for images", "<query: string>", ["plants"])
    });
  }
  async run(context: Command.Context, args: PxlImageSearchArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);

    const results = await pxl.imageSearch(args.query, "moderate", true);
    if (!results.length) {
      throw new Err("no results found");
    }

    const paginator = new Paginator(context, {
      pageLimit: results.length,
      onPage: async (page) => {
        const image = results[page - 1]!;
        const embed = createBrandEmbed(Brand.PXL_API, context);
        embed.setImage(image.url);
        embed.setTitle(image.title);
        embed.setDescription(
          `Page ${page}/${results.length}\nLocation: ${image.location}`
        );

        return embed;
      },
    });
    return await paginator.start();
  }
}
