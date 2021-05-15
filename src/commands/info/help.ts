import { Command, CommandClient } from "detritus-client";
import { client } from "../..";
import { findCommand } from "../../functions/findCommand";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { generateUsage } from "../../functions/generateUsage";
import { commands, CustomError } from "../../globals";
import { BaseCommand } from "../basecommand";

export default class GuildCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "command",
      name: "help",
      aliases: ["commands", "?", "cmds", "cmd", "command"],
      args: [],
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const emb = generateEmbed({ user: context.user }).setAuthor(
      "Help Menu",
      client.user?.avatarUrl
    );
    const data: string[] = [];
    if (args.command) {
      const command = findCommand(context.commandClient, args.command);
      if (!command)
        throw new CustomError(`Could not find command '${args.command}'`);
      data.push(`\`\`\`lua\n${generateUsage(command)}\`\`\``);
    } else {
      data.push(
        `Invites: [Bot](https://arcy-at.github.io/bot) | [Discord](https://https://arcy-at.github.io/)`
      );
      data.push(`My prefixes are: ${commands.prefixes.custom.join(", ")}`);
      data.push(
        `\nList of commands: ${commands.commands
          .map((v) => `\`${v.name}\``)
          .join(", ")}`
      );
      data.push("\n(use `$help [command]` to get info on a specific command)");
    }
    emb.setDescription(data.join("\n"));
    context.editOrReply({ embed: emb });
  }
}
