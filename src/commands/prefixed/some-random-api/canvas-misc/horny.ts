import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import {
  Canvas,
  someRandomApiCanvasMisc,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { BaseCommand, ImageArgs } from "../../basecommand";

export interface SRAHornyArgs {
  user: User;
}

export default class SRAHornyCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "horny",

      label: "image",
      type: Parameters.image,
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      args.image,
      Canvas.HORNY,
      args
    );
    return await context.editOrReply({ embed });
  }
}
