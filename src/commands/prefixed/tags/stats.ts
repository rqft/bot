import { Command, CommandClient } from "detritus-client";
import fs from "fs";
import { Typeof } from "wilson-kv";
import { createUserEmbed } from "../../../functions/embed";
import {
  capitalizeWords,
  formatBytes,
  getDuplicates,
  unstringify,
} from "../../../functions/tools";
import { KV } from "../../../globals";
import { BaseCommand } from "../basecommand";
export default class TagStatsCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag stats",
      aliases: ["t stats"],
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

      embed.addField("File Statistics", description.join("\n"));
    }

    {
      const description: Array<string> = [];

      const typeCounts = new Map<Typeof, number>([
        ["bigint", 0],
        ["boolean", 0],
        ["function", 0],
        ["number", 0],
        ["object", 0],
        ["string", 0],
        ["symbol", 0],
        ["undefined", 0],
      ]);
      for (const item of items) {
        const type = typeof unstringify(String(item.value));
        if (!typeCounts.has(type)) {
          typeCounts.set(type, 0);
        }
        typeCounts.set(type, typeCounts.get(type)! + 1);
      }

      for (const [type, count] of typeCounts) {
        description.push(`**${capitalizeWords(type)}**: ${count}`);
      }

      embed.addField("Value Type Statistics", description.join("\n"));
    }

    return await context.editOrReply({ embed });
  }
}
