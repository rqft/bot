import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Imagga } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageUrlArgs } from "../basecommand";

export default class ImaggaBarcodesCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "barcodes",
      aliases: ["barcode", "bc"],

      label: "image",
      type: Parameters.imageUrl("png"),
    });
  }
  async run(context: Command.Context, args: ImageUrlArgs) {
    const im = new Imagga(Secrets.Key.imaggaAuth);
    const text = await im.barcodes({ image_url: args.image });
    if (text.status.type === "error") throw new Err(text.status.text);
    if (!text.result.barcodes.length) throw new Err("No text found");

    const embed = createBrandEmbed(Brand.IMAGGA, context);
    embed.setThumbnail(args.image);

    text.result.barcodes.forEach((v, i) => {
      embed.addField(
        `Barcode ${i + 1}`,
        `Located At: (${v.x1}, ${v.y1})\nSize: ${v.x2 - v.x1}x${
          v.y2 - v.y1
        }\n${Markup.codeblock(v.data)}`
      );
    });

    return await context.editOrReply({ embed });
  }
}
