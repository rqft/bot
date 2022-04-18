import { Command, CommandClient } from "detritus-client";
import fs from "fs";
import { createUserEmbed } from "../../../functions/embed";
import {
  editOrReply,
  formatBytes,
  getDuplicates,
} from "../../../functions/tools";
import { KV } from "../../../globals";
import { BaseCommand, CommandTypes } from "../basecommand";
export default class TagStatsCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag stats",
      aliases: ["t stats"],
      metadata: {
        usage: "",
        description: "Shows stats about the tags database",
        type: CommandTypes.TOOLS,
        examples: [],
      },
    });
  }
  async run(context: Command.Context) {
    const embed = createUserEmbed(context);

    const items = KV.tags.items();

    {
      const description: Array<string> = [];
      description.push(`**Keys**: ${items.length}`);

      const file = fs.statSync(KV.tags.path());
      description.push(`**File Size**: ${formatBytes(file.size)}`);

      const duplicates = getDuplicates(items.map((item) => item.value));
      description.push(`**Disposable Keys**: ${duplicates.length}`);

      embed.setDescription(description.join("\n"));
    }

    return await editOrReply(context, { embed });
  }
}
