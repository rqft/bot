import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Imagga } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { padCodeBlockFromRows } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageUrlArgs } from "../basecommand";

export default class ImaggaTagsCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tags",

      label: "image",
      type: Parameters.imageUrl("png"),
    });
  }
  async run(context: Command.Context, args: ImageUrlArgs) {
    console.log(args.image);
    const im = new Imagga(Secrets.Key.imaggaAuth);

    const tags = await im.tags({ image_url: args.image, limit: 20 }, "");
    if (tags.status.type === "error") throw new Error(tags.status.text);

    const embed = createBrandEmbed(Brand.IMAGGA, context);
    embed.setThumbnail(args.image);
    embed.setDescription(
      Markup.codeblock(
        padCodeBlockFromRows([
          ["Tag", "Confidence"],
          ...tags.result.tags.map((v) => [v.tag.en, v.confidence.toFixed(3)]),
        ]).join("\n")
      )
    );
    return await context.editOrReply({ embed });
  }
}
