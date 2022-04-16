import { Command, CommandClient } from "detritus-client";
import { createUserEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { KV } from "../../../globals";
import { BaseCommand } from "../basecommand";
export interface TagSetArgs {
  key: string;
  value: string;
}
export default class TagSetCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag set",
      aliases: ["t set"],
      type: [
        {
          name: "key",
          type: Parameters.string({ minimumLength: 1, maximumLength: 1000 }),
        },
        {
          name: "value",
          type: Parameters.string({ minimumLength: 1, maximumLength: 1000 }),
          consume: true,
        },
      ],
    });
  }
  async run(context: Command.Context, args: TagSetArgs) {
    const embed = createUserEmbed(context);
    embed.setTitle("Set Tag");
    const old = KV.tags.get(args.key);
    if (old) {
      embed.addField("Previous Value", String(old));
    }
    KV.tags.put(args.key, args.value);
    embed.addField("Current Value", String(args.value));

    return await context.editOrReply({ embed });
  }
}
