import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { APIs } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, padCodeBlockFromRows } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageUrlArgs, ToolsMetadata } from "../basecommand";

export default class ImaggaColorsCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "colors",

      label: "image",
      type: Parameters.imageUrl("png"),
      metadata: ToolsMetadata(
        "Get predominant colors from an image",
        "<image: Image>"
      ),
    });
  }
  async run(context: Command.Context, args: ImageUrlArgs) {
    const im = new APIs.Imagga.API(Secrets.Key.imaggaAuth);
    const colors = await im.colors(args.image, {});
    if (colors.status.type === "error") throw new Err(colors.status.text);

    const embed = createBrandEmbed(Brand.IMAGGA, context);
    embed.setThumbnail(args.image);
    embed.addField(
      "Background Colors",
      Markup.codeblock(colorsTable(colors.result.colors.background_colors))
    );
    embed.addField(
      "Foreground Colors",
      Markup.codeblock(colorsTable(colors.result.colors.foreground_colors))
    );
    return await editOrReply(context, { embed });
  }
}
function colorsTable(colors: Array<APIs.Imagga.Color>): string {
  return padCodeBlockFromRows([
    ["Color", "Percentage"],
    ...colors.map((v) => [
      `${v.closest_palette_color} (${v.html_code})`,
      v.percent.toFixed(3),
    ]),
  ]).join("\n");
}
