import { Command, CommandClient } from "detritus-client";
import {
  Canvas,
  someRandomApiCanvasMisc,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs, ImageMetadata } from "../../basecommand";

export default class SRABlurCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "blur",

      label: "image",
      type: Parameters.image(),
      metadata: ImageMetadata("Blur an image", "<image: Image>"),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      args.image,
      Canvas.BLUR,
      {}
    );
    return await editOrReply(context, { embed });
  }
}
