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

export interface SRAYoutubeCommentArgs {
  user: User;
  comment: string;
}

export default class SRAYoutubeCommentCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "yt-comment",
      aliases: ["youtube-comment", "ytcomment", "ytc", "youtubecomment"],

      label: "comment",
      type: "string",
      required: true,
      args: [
        {
          name: "user",
          type: Parameters.user,
          default: Parameters.Default.user,
        },
      ],
      metadata: FunMetadata(
        "Create a fake youtube comment",
        "<comment: string> ?<-user: User>",
        ["I love walking", "I love walking -user insyri"]
      ),
    });
  }
  async run(context: Command.Context, args: SRAYoutubeCommentArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      await (await fetch(args.user.avatarUrl)).buffer(),
      Canvas.FAKE_YOUTUBE_COMMENT,
      { username: args.user.username, comment: args.comment }
    );
    return await editOrReply(context, { embed });
  }
}
