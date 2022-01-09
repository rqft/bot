import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import fetch from "node-fetch";
import {
  Canvas,
  someRandomApiCanvasMisc,
} from "../../../../functions/formatter";
import {
  DefaultParameters,
  Parameters,
} from "../../../../functions/parameters";
import { BaseCommand } from "../../basecommand";

export interface SRATweetArgs {
  user: User;
  comment: string;
}

export default class SRATweetCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tweet",

      type: [
        {
          name: "user",
          type: Parameters.user,
          default: DefaultParameters.user,
        },
        { name: "comment", type: "string", required: true },
      ],
    });
  }
  async run(context: Command.Context, args: SRATweetArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      await (await fetch(args.user.avatarUrl)).buffer(),
      Canvas.FAKE_TWEET,
      {
        username: args.user.username,
        displayname: args.user.username,
        comment: args.comment,
      }
    );
    return await context.editOrReply({ embed });
  }
}
