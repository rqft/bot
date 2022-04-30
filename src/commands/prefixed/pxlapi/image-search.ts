import { Command, CommandClient } from "detritus-client";
import { APIs } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Paginator } from "../../../functions/paginator";
import { Secrets } from "../../../secrets";
import { BaseCommand, ToolsMetadata } from "../basecommand";
export interface PxlImageSearchArgs {
  query: string;
}
export default class PxlImageSearchCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image-search",
      aliases: ["imagesearch", "img"],

      label: "query",
      type: "string",
      required: true,

      metadata: ToolsMetadata("Search for images", "<query: string>"),
    });
  }
  async run(context: Command.Context, args: PxlImageSearchArgs) {
    const pxl = new APIs.PxlAPI.API(Secrets.Key.pxlAPI);

    const results = await pxl.imageSearch(
      args.query,
      APIs.PxlAPI.SafeSearch.STRICT,
      true
    );
    if (!results.length) {
      throw new Err("No results found");
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
