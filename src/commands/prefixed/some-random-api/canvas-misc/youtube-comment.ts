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
          default: DefaultParameters.user,
        },
      ],
    });
  }
  async run(context: Command.Context, args: SRAYoutubeCommentArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      await (await fetch(args.user.avatarUrl)).buffer(),
      Canvas.FAKE_YOUTUBE_COMMENT,
      { username: args.user.username, comment: args.comment }
    );
    return await context.editOrReply({ embed });
  }
}
