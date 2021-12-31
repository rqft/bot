import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import { Canvas, someRandomApiCanvasMisc } from "../../../functions/formatter";
import { Parameters } from "../../../functions/parameters";
import { BaseCommand, ImageArgs } from "../../basecommand";

export interface SRAPixelateArgs {
  user: User;
}

export default class SRAPixelateCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pixelate",

      label: "image",
      type: Parameters.image,
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      args.image,
      Canvas.PIXELATE,
      {}
    );
    return await context.editOrReply({ embed });
  }
}
