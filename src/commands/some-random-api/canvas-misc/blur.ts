import { Command, CommandClient } from "detritus-client";
import { Canvas, someRandomApiCanvasMisc } from "../../../functions/formatter";
import { Parameters } from "../../../functions/parameters";
import { BaseCommand, ImageArgs } from "../../basecommand";

export default class SRABlurCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "blur",

      label: "image",
      type: Parameters.image,
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      args.image,
      Canvas.BLUR,
      {}
    );
    return await context.editOrReply({ embed });
  }
}
