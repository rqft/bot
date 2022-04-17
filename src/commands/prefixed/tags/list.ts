import { Command, CommandClient } from "detritus-client";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, escapeRegExp } from "../../../functions/tools";
import { KV } from "../../../globals";
import { BaseCommand } from "../basecommand";
export interface TagListArgs {
  search?: string;
}
export default class TagListCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag list",
      aliases: ["t list", "t ls", "tag ls"],
      type: [
        {
          name: "search",
          type: Parameters.string({ minimumLength: 1, maximumLength: 1000 }),
          required: false,
        },
      ],
    });
  }
  async run(context: Command.Context, args: TagListArgs) {
    const embed = createBrandEmbed(Brand.VYBOSE, context);
    embed.setTitle("List of Tags");
    let list = KV.tags.list();
    if (!list.length) {
      throw new Err("No tags found", { status: 404 });
    }
    if (args.search) {
      const fuzzy = new RegExp(
        `(?:.*)(${args.search.split("").map(escapeRegExp).join("|")})(?:.*)`,
        "gi"
      );

      list = list.filter((tag) => fuzzy.test(tag));
    }
    if (!list.length) {
      throw new Err("No tags matched the search", { status: 400 });
    }
    embed.setDescription(list.join(", "));

    return await editOrReply(context, { embed });
  }
}
