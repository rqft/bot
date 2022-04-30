import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Paginator } from "../../../functions/paginator";
import { Parameters } from "../../../functions/parameters";
import { capitalizeWords } from "../../../functions/tools";
import { commands } from "../../../globals";
import { BaseCommand, CommandTypes, UtilityMetadata } from "../basecommand";

export interface HelpArgs {
  commands?: Array<BaseCommand>;
}
export default class HelpCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "help",
      aliases: ["command", "commands", "cmds", "cmd", "h", "?"],

      label: "commands",
      type: Parameters.command,
      required: false,

      metadata: UtilityMetadata("Get help menu", "?<commands: string>"),
    });
  }
  async run(context: Command.Context, args: HelpArgs) {
    const embed = createBrandEmbed(Brand.VYBOSE, context, true);
    embed.setTitle("Help Menu");
    if (!args.commands) {
      const list = commands.commands;
      const map = new Map<CommandTypes, Array<Command.Command>>();
      for (const command of list) {
        const type = command.metadata.type;
        if (!map.has(type)) {
          map.set(type, []);
        }
        map.get(type)!.push(command);
      }
      const pages = Array.from(map.keys());
      const paginator = new Paginator(context, {
        pageLimit: pages.length,
        onPage(page: number) {
          const type = pages[page - 1]!;
          const commands = map.get(type) || [];
          const embed = createBrandEmbed(Brand.VYBOSE, context, true);
          embed.setTitle(capitalizeWords(type) + " Commands");
          if (!commands.length) {
            embed.setDescription(`No ${capitalizeWords(type)} commands found`);
          } else {
            embed.setDescription(
              Markup.codeblock(commands.map((v) => v.fullName).join(", "))
            );
          }
          return embed;
        },
      });

      return await paginator.start();
    }

    const paginator = new Paginator(context, {
      pageLimit: args.commands.length,
      onPage(page: number) {
        const command = args.commands![page - 1]!;
        const embed = createBrandEmbed(Brand.VYBOSE, context, true);
        embed.setTitle(command.fullName);
        {
          const description: Array<string> = [];
          if (command.metadata.description) {
            description.push(command.metadata.description);
          }

          if (command.metadata.nsfw) {
            description.push(`${Markup.bold("Nsfw")}: Yes`);
          }

          if (command.metadata.type) {
            description.push(
              `${Markup.bold("Type")}: ${Markup.codestring(
                command.metadata.type
              )}`
            );
          }

          embed.setDescription(description.join("\n"));
        }

        embed.addField("Usage", Markup.codeblock(command.metadata.usage));

        if (command.metadata.examples.length) {
          embed.addField(
            "Examples",
            Markup.codeblock(
              command.metadata.examples
                .map((value) => command.fullName + " " + value)
                .join("\n")
            )
          );
        }
        return embed;
      },
    });

    return await paginator.start();
  }
}
