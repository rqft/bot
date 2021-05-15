import { Command, CommandClient } from "detritus-client";
import { formatValues } from "../../functions/formatValues";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import * as Collector from "../../functions/getters";
import { BaseCommand } from "../basecommand";

export default class StatsCommand extends BaseCommand {
  constructor(client: CommandClient, _: any) {
    super(client, {
      name: "stats",
    });
  }
  async run(context: Command.Context, _: any) {
    await context.editOrReply("ok, pulling");
    const emb = generateEmbed({ user: context.user });
    const values: Record<string, number> = {};
    [
      Collector.getCollectiveApplications,
      // Collector.getCollectiveChannels,
      // Collector.getCollectiveEmojis,
      Collector.getCollectiveGuilds,
      // Collector.getCollectiveMessages,
      // Collector.getCollectiveRoles,
      // Collector.getCollectiveUsers,
      Collector.getCollectiveVoiceStates,
      Collector.getCollectors,
    ].forEach((v) => {
      console.time(`key '${v.name}'`);
      values[v.name.replace(/^get|Collective/g, "")] = v().length;
      console.timeEnd(`key '${v.name}'`);
    });
    const collected = `\`\`\`hs\n${formatValues(values).join("\n")}\`\`\``;
    emb.addField(`❯ Collected Items`, collected);
    await context.editOrReply({ embed: emb });
  }
}
