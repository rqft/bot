import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import {
  Canvas,
  someRandomApiCanvasMisc,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs, ImageMetadata } from "../../basecommand";

export interface SRAPixelateArgs {
  user: User;
}

export default class SRAPixelateCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pixelate",

      label: "image",
      type: Parameters.image("png"),
      metadata: ImageMetadata("Pixelate an image", "<image: Image>"),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      args.image,
      Canvas.PIXELATE,
      {}
    );
    return await editOrReply(context, { embed });
  }
}
