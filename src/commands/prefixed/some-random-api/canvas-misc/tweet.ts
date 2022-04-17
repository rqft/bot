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
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand } from "../../basecommand";

export interface SRATweetArgs {
  user: User;
  comment: string;
  displayname: string;
}

export default class SRATweetCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tweet",

      label: "comment",
      type: "string",
      required: true,
      args: [
        {
          name: "user",
          type: Parameters.user,
          default: DefaultParameters.user,
        },
        {
          name: "displayname",
          aliases: ["name"],
          type: String,
          default: "",
        },
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
        displayname: args.displayname || args.user.username,
        comment: args.comment,
      }
    );
    return await editOrReply(context, { embed });
  }
}
