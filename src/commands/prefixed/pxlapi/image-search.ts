import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Secrets } from "../../../secrets";
import { BaseCommand } from "../basecommand";
export interface PxlImageSearchArgs {
  query: string;
}
export default class PxlImageSearchCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image-search",
      aliases: ["imagesearch"],

      label: "query",
      type: "string",
      required: true,
    });
  }
  async run(context: Command.Context, args: PxlImageSearchArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);

    const [imageSearch] = await pxl.imageSearch(args.query, "moderate", true);
    if (!imageSearch) {
      throw new Error("no results found");
    }
    const embed = createBrandEmbed(Brand.PXL_API, context);
    embed.setImage(imageSearch.url);
    embed.setTitle(imageSearch.title);
    embed.setDescription(`Location: ${imageSearch.location}`);

    return await context.editOrReply({ embed });
  }
}
