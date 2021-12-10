// https://gdbrowser.com/icon/
import { Command, CommandClient } from "detritus-client";
import { Brand } from "../../enums/brands";
import { createBrandEmbed } from "../../functions/embed";
import { GDBrowser } from "../../functions/gdbrowser";
import { Markup } from "../../functions/markup";
import { simpleGetLongAgo } from "../../functions/tools";
import { BaseCommand } from "../basecommand";
export interface GDLevelArgs {
  levelId: string;
}
export default class GDLevelCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "level",

      label: "levelId",
      required: true,
      type: "string",
    });
  }
  async run(context: Command.Context, args: GDLevelArgs) {
    let gd = new GDBrowser();
    let level = await gd.levels(args.levelId, false);
    if (level === -1) {
      return context.editOrReply("that isnt a level");
    }
    let embed = createBrandEmbed(Brand.GD_BROWSER, context);
    embed.setTitle(`${level.name} by ${level.author} (${level.id})`);
    if (level.description) {
      embed.setDescription(Markup.italics(level.description));
    }
    embed.setThumbnail(
      `https://gdbrowser.com/assets/difficulties/${level.difficultyFace}.png`
    );

    {
      const description: Array<string> = [];

      description.push(`**Downloads**: ${level.downloads}`);

      if (level.disliked) {
        description.push(`**Dislikes**: ${level.likes}`);
      } else {
        description.push(`**Likes**: ${level.likes}`);
      }

      description.push(`**Length**: ${level.length}`);

      description.push(`**Version Created**: ${level.gameVersion}`);

      description.push(`**Revisions**: ${level.version}`);

      if (level.dailyNumber) {
        let key = level.weekly ? "Weekly" : "Daily";
        description.push("\n");
        description.push(`${key} level #${level.dailyNumber}`);
        description.push(
          `Expires in ${simpleGetLongAgo(level.nextDailyTimestamp!)}`
        );
      }

      const stats: Array<string> = [];
      stats.push(
        `**Objects**: ${level.objects.toLocaleString()} ${
          level.objects > 80000 ? "Very High" : level.large ? "(High)" : ""
        }`
      );
      if (level.twoPlayer) stats.push(`**Two Player**: Yes`);
      if (level.ldm) stats.push(`**Low Detail Mode Available**: Yes`);

      embed.addField("Statistics", description.join("\n"));
    }

    {
      const description: Array<string> = [];

      embed.addField("Rewards", description.join("\n"));
      if (level.stars) description.push(`${level.stars} Stars`);
    }
    await context.editOrReply({ embed });
  }
}
