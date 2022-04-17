import { Command, CommandClient } from "detritus-client";
import { Parameters } from "../../../functions/parameters";
import { Tags } from "../../../functions/tags";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand } from "../basecommand";
export interface TagExecArgs {
  script: string;
  args: Array<string>;
}
export default class TagExecCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag exec",
      aliases: ["t exec", "tag test", "t test", "tag eval", "t eval"],
      type: [
        {
          name: "script",
          type: Parameters.string({ minimumLength: 1, maximumLength: 1000 }),
          required: true,
        },
      ],
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
  async run(context: Command.Context, args: TagExecArgs) {
    const value = await Tags.exec(context, args.script, args.args);
    return await editOrReply(context, value.text);
    editOrReply(context);
  }
}
