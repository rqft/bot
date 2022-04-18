import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import {
  Canvas,
  someRandomApiCanvasMisc,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs, ImageMetadata } from "../../basecommand";

export interface SRAHornyArgs {
  user: User;
}

export default class SRAHornyCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "horny",

      label: "image",
      type: Parameters.image(),
      metadata: ImageMetadata(
        "Creates a 'license to be horny' card",
        "<image: Image>"
      ),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      args.image,
      Canvas.HORNY,
      {}
    );
    return await editOrReply(context, { embed });
  }
}
