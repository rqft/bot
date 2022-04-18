import { Command, CommandClient } from "detritus-client";
import { SomeRandomAPI } from "pariah";
import { Brand } from "../../../../enums/brands";
import { createImageEmbed } from "../../../../functions/embed";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageMetadata } from "../../basecommand";
export interface SRAColorViewerArgs {
  color: number;
}
export default class SRAColorViewerCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "colorviewer",
      aliases: ["viewcolor"],

      label: "color",
      type: Parameters.color,
      required: true,
      metadata: ImageMetadata("Inspects a color", "<color: Color>", ["1e1e1e"]),
    });
  }
  async run(context: Command.Context, args: SRAColorViewerArgs) {
    const sra = new SomeRandomAPI();
    const color = await sra.colorViewer(args.color);
    const embed = await createImageEmbed(
      context,
      color,
      undefined,
      Brand.SOME_RANDOM_API
    );
    return await editOrReply(context, { embed });
  }
}
