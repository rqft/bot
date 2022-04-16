import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { createUserEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { Tags } from "../../../functions/tags";
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
    const embed = createUserEmbed(context);

    const value = await Tags.exec(context, args.script, args.args);

    embed.setDescription(
      Markup.codeblock(String(value.text), { language: "json" })
    );

    return await context.editOrReply({ embed });
  }
}
