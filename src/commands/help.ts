import { MessageEmbed } from "discord.js";
import { commands } from "..";
import { config } from "../config";
import { hallucinateColor } from "../globals";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands", "c", "?"],
  usage: "[command: string]",
  run(message, args) {
    const data = [];
    const prefix = config.bot.prefixes[0];
    if (!args![0]) {
      data.push(
        `My prefixes are: ${config.bot.prefixes
          .join(", ")
          .replace(/\?|\\/g, "")}`
      );
      data.push("Here's a list of all my commands:");
      data.push(commands.map((command: any) => command.name).join(", "));
      data.push(
        `\nYou can send "${prefix}help [command name]" to get info on a specific command!`
      );

      return message.channel.send(
        new MessageEmbed({
          description: data.join("\n"),
          color: hallucinateColor,
        }),
        { split: true }
      );
    }

    const name = args![0].toLowerCase();
    const command =
      (commands.get(name) as ICommand) ||
      (commands.find(
        (c: any) => c.aliases && c.aliases.includes(name)
      ) as ICommand);

    if (!command) {
      return message.channel.send("that's not a valid command!");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    message.channel.send(data, { split: true });
  },
} as ICommand;
