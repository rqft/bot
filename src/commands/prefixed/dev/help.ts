import { Command, CommandClient } from "detritus-client";
import { Permissions } from "detritus-client/lib/constants";
import { Markup } from "detritus-client/lib/utils";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import {
  bitfieldToArray,
  capitalizeWords,
  expandMs,
  generateUsage,
} from "../../../functions/tools";
import { BaseCommand } from "../basecommand";

export interface HelpArgs {
  command?: Command.Command;
}
export default class HelpCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "help",
      aliases: ["command", "commands", "cmds", "cmd", "h", "?"],

      label: "command",
      type: Parameters.command,
      required: false,
    });
  }
  async run(context: Command.Context, args: HelpArgs) {
    const embed = createBrandEmbed(Brand.VYBOSE, context, true);
    embed.setTitle("Help Menu");
    if (!args.command) {
      embed.setDescription(
        `**Command List**\n${Markup.codeblock(
          context.commandClient!.commands.map((value) => value.name).join(", ")
        )}`
      );
      return await context.editOrReply({ embed });
    }
    const { command } = args;
    {
      const description: Array<string> = [];
      description.push(`**Name**: ${command.name}`);
      if (command.aliases && command.aliases.length) {
        description.push(`**Aliases**: ${command.aliases.join(", ")}`);
      }
      if (command.ratelimits && command.ratelimits.length) {
        description.push(`**Ratelimits**`);
        for (let ratelimit of command.ratelimits) {
          description.push(
            `-> **${capitalizeWords(String(ratelimit.type))}**: ${
              ratelimit.limit
            } per ${expandMs(ratelimit.duration)}`
          );
        }
      }
      if (command.permissions) {
        const permissions = command.permissions
          .map((v) => bitfieldToArray(v, Object.keys(Permissions)))
          .flat(1);
        description.push(`**Needed Permissions**: ${permissions.join(", ")}`);
      }
      if (command.permissionsClient) {
        const permissions = command.permissionsClient
          .map((v) => bitfieldToArray(v, Object.keys(Permissions)))
          .flat(1);
        description.push(
          `**Needed Bot Permissions**: ${permissions.join(", ")}`
        );
      }
      embed.setDescription(description.join("\n"));
    }
    embed.addField("Usage", Markup.codeblock(generateUsage(command)));
    return await context.editOrReply({ embed });
  }
}
