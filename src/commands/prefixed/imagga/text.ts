import { Command, CommandClient } from "detritus-client";
import { imageOcr } from "../../../functions/formatter";
import { Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand, ImageUrlArgs, ToolsMetadata } from "../basecommand";

export default class ImaggaTextCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "text",
      aliases: ["ocr"],

      label: "image",
      type: Parameters.imageUrl("png"),
      metadata: ToolsMetadata("Read text from an image", "<image: Image>"),
    });
  }
  async run(context: Command.Context, args: ImageUrlArgs) {
    const embed = await imageOcr(context, args.image);

    return await editOrReply(context, { embed });
  }
}
