import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { createUserEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { KV } from "../../../globals";
import { BaseCommand } from "../basecommand";
export interface TagRawArgs {
  key: string;
}
export default class TagRawCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag raw",
      aliases: ["t raw"],
      type: [
        {
          name: "key",
          type: Parameters.string({ minimumLength: 1, maximumLength: 1000 }),
        },
      ],
    });
  }
  async run(context: Command.Context, args: TagRawArgs) {
    const embed = createUserEmbed(context);

    const value = KV.tags.get(args.key);
    if (!value) {
      throw new Err(`Tag '${args.key}' does not exist`, { status: 404 });
    }

    embed.setDescription(Markup.codeblock(String(value), { language: "json" }));

    return await context.editOrReply({ embed });
  }
}
