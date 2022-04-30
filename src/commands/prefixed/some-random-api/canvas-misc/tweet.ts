import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import fetch from "node-fetch";
import {
  Canvas,
  someRandomApiCanvasMisc,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, FunMetadata } from "../../basecommand";

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
          default: Parameters.Default.user,
        },
        {
          name: "displayname",
          aliases: ["name"],
          type: String,
          default: "",
        },
      ],
      metadata: FunMetadata(
        "Create a fake Tweet",
        "<comment: string> ?<-user: User> ?<-name: string>",
        [
          "I love walking",
          "I love walking -user insyri",
          "I love walking -user thowoee -name Tehi",
        ]
      ),
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
