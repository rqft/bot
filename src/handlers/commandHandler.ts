import { Message, Permissions } from "discord.js";
import { config } from "../config";
import { fetchCommand } from "../functions/fetchCommand";
import { ICommand } from "../interfaces/ICommand";
import { logBlacklistedUserAction } from "../logs/logBlacklistedUserAction";
import { logCommandError } from "../logs/logCommandError";
import { logCommandUse } from "../logs/logCommandUse";
import { logError } from "../logs/logError";

export async function commandHandler(message: Message) {
  const prefixRegex = new RegExp(
    `^(${config.bot.prefixes.join("|")})( ?)`,
    "gi"
  );
  if (message.content.match(prefixRegex) == null) return;
  const prefix = message.content.match(prefixRegex)!.join("");
  const args = message.content.slice(prefix!.length).trim().split(/ +/);
  const commandName = args.shift()!.toLowerCase();
  if (prefix == "p/" && !config.bot.ownerIds.includes(message.author.id))
    return await message.channel.send(
      `:lock: The prefix \`p/\` is intended for dev use only. Use \`$${commandName}\` instead.`
    );
  const command: ICommand = fetchCommand(commandName);
  if (!command) return;
  if (config.blacklist.users.includes(message.author.id))
    return logBlacklistedUserAction(message);
  if (
    command.restrictions &&
    command.restrictions.ownerOnly &&
    !config.bot.ownerIds.includes(message.author.id)
  )
    return message.channel.send(
      ":lock: Missing Permissions; You need: `Bot Owner`"
    );
  if (
    command.restrictions &&
    command.restrictions.serverOwnerOnly &&
    message.guild &&
    message.guild!.ownerID !== message.author.id
  )
    return message.channel.send(
      ":lock: Missing Permissions; You need: `Server Owner`"
    );
  if (
    command.restrictions &&
    command.restrictions.permissions &&
    !message.member?.permissions.has(
      new Permissions(command.restrictions.permissions),
      true
    )
  )
    return message.channel.send(
      `:lock: Missing Permissions; You need: \`${command.restrictions.permissions.join(
        ", "
      )}\``
    );
  if (
    command.restrictions &&
    command.restrictions.guildOnly &&
    message.channel.type === "dm"
  )
    return message.channel.send(
      ":warning: I can't execute that command inside DMs!"
    );
  if (command.usesArgs && !args.length)
    return message.channel.send(
      `:warning: Argument Error (missing argument)${
        command.usage
          ? `\n\`\`\`${prefix}${command.name} ${command.usage}\`\`\``
          : ""
      }`
    );

  try {
    logCommandUse(message);
    command.run(message, args);
  } catch (error) {
    console.error(error);
    logCommandError(message, error);
    logError({
      message: `${prefix}${command.name}`,
      name: "Command Error",
      stack: (error as Error).stack,
    });
    message.channel.send(`:no_entry: ${error}`);
  }
}
