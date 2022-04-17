import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import {
  Canvas,
  someRandomApiCanvasMisc,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs } from "../../basecommand";

export interface SRASimpCardArgs {
  user: User;
}

export default class SRASimpCardCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "simpcard",

      label: "image",
      type: Parameters.image("png"),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      args.image,
      Canvas.SIMPCARD,
      args
    );
    return await editOrReply(context, { embed });
  }
}
