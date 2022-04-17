import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Imagga } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, padCodeBlockFromRows } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageUrlArgs } from "../basecommand";

export default class ImaggaCategoriesCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "categories",

      label: "image",
      type: Parameters.imageUrl("png"),
    });
  }
  async run(context: Command.Context, args: ImageUrlArgs) {
    const im = new Imagga(Secrets.Key.imaggaAuth);
    const categories = await im.categories(
      { image_url: args.image },
      "personal_photos"
    );
    if (categories.status.type === "error")
      throw new Err(categories.status.text);

    const embed = createBrandEmbed(Brand.IMAGGA, context);
    embed.setThumbnail(args.image);
    embed.setDescription(
      Markup.codeblock(
        padCodeBlockFromRows([
          ["Category", "Confidence"],
          ...categories.result.categories
            .slice(0, 20)
            .map((v) => [v.name.en, v.confidence.toFixed(3)]),
        ]).join("\n")
      )
    );
    return await editOrReply(context, { embed });
  }
}
