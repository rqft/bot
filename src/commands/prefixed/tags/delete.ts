import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Emojis } from "../../../enums/emojis";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import { KV } from "../../../globals";
import { BaseCommand } from "../basecommand";
export interface TagDeleteArgs {
  key: string;
}
export default class TagDeleteCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag delete",
      aliases: ["t delete"],
      type: [
        {
          name: "key",
          type: Parameters.string({ minimumLength: 1, maximumLength: 1000 }),
        },
      ],
    });
  }
  async run(context: Command.Context, args: TagDeleteArgs) {
    const value = KV.tags.get(args.key);
    if (!value) {
      throw new Err(`Tag '${args.key}' does not exist`, { status: 404 });
    }
    KV.tags.delete(args.key);

    return await editOrReply(
      context,
      `${Emojis.WHITE_CHECK_MARK} Deleted tag ${Markup.codestring(args.key)}`
    );
  }
}
