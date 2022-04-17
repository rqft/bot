import { Command, CommandClient } from "detritus-client";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { Tags } from "../../../functions/tags";
import { editOrReply } from "../../../functions/tools";
import { KV } from "../../../globals";
import { BaseCommand } from "../basecommand";

export interface TagGetArgs {
  key: string;
  args: string[];
}
export default class TagGetCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag",
      aliases: ["t", "tag get", "t get"],
      type: [
        {
          name: "key",
          type: Parameters.string({ minimumLength: 1, maximumLength: 1000 }),
        },
      ],
      priority: -1,
      args: [
        {
          name: "args",
          type: Parameters.list({
            transform: Parameters.string({
              minimumLength: 1,
              maximumLength: 1000,
            }),
          }),
          default: [],
        },
      ],
    });
  }
  async run(context: Command.Context, args: TagGetArgs) {
    const value = KV.tags.get(args.key);
    if (!value) {
      throw new Err(`Tag '${args.key}' does not exist`, { status: 404 });
    }
    const output = await Tags.exec(context, String(value), args.args);

    return await editOrReply(context, {
      content: output.text,
      allowedMentions: {},
      attachments: output.files,
    });
  }
}
