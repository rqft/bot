import { Command, CommandClient } from "detritus-client";
import { imageOcr } from "../../../functions/formatter";
import { Parameters } from "../../../functions/parameters";
import { BaseCommand, ImageUrlArgs } from "../basecommand";

export default class ImaggaTextCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "text",
      aliases: ["ocr"],

      label: "image",
      type: Parameters.imageUrl("png"),
    });
  }
  async run(context: Command.Context, args: ImageUrlArgs) {
    const embed = await imageOcr(context, args.image);

    return await context.editOrReply({ embed });
  }
}
