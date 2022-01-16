import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Imagga } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageUrlArgs } from "../basecommand";

export default class ImaggaTextCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "text",
      aliases: ["ocr"],

      label: "image",
      type: Parameters.imageUrl,
    });
  }
  async run(context: Command.Context, args: ImageUrlArgs) {
    const im = new Imagga(Secrets.Key.imaggaAuth);
    const text = await im.text({ image_url: args.image });
    console.log(args.image, text);
    if (text.status.type === "error") throw new Error(text.status.text);
    if (!text.result.text.length) throw new Error("No text found");

    const embed = createBrandEmbed(Brand.IMAGGA, context);
    embed.setThumbnail(args.image);

    text.result.text.forEach((v, i) => {
      embed.addField(
        `Text ${i + 1}`,
        `Located At: (${v.coordinates.xmin}, ${v.coordinates.ymin})\nSize: ${
          v.coordinates.width
        }x${v.coordinates.height}\n${Markup.codeblock(v.data)}`
      );
    });

    return await context.editOrReply({ embed });
  }
}
