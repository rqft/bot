import { Message, Permissions } from "discord.js";
import { commands } from "..";
import { escapeRegex } from "../functions/escapeRegex";
import { getBotLevel } from "../functions/getBotLevel";
import { getConfig } from "../functions/getConfig";
import { replacer } from "../functions/replacer";
import { globalConf } from "../globalConf";
import { ICommand } from "../interfaces/ICommand";
import { messages } from "../messages";
export async function onCommand(message: Message) {
  if (!message.guild || !message.member) return;
  const config = getConfig(message.guild.id);
  if (!config) return;
  const prefixRegex = new RegExp(
    `^(${
      config.modules.commands.prefixes ??
      ["!"].map((e) => escapeRegex(e)).join("|")
    }|<@!?${message.guild.me!.id}>)( ?)`,
    "gi"
  );
  if (message.content.match(prefixRegex) == null) return;
  const prefix = message.content.match(prefixRegex)!.join("");
  const args = message.content.slice(prefix!.length).trim().split(/ +/);
  const commandName = args.shift()!.toLowerCase();
  const command: ICommand =
    commands.get(commandName) ||
    commands.find(
      (cmd: ICommand) => cmd.aliases! && cmd.aliases.includes(commandName)!
    );
  if (!command) return;
  if (
    command.restrictions &&
    command.restrictions.level !== undefined &&
    getBotLevel(message.member!, config) < command.restrictions.level
  ) {
    return await message.reply(
      replacer(
        messages.permissions.missing_level,
        new Map([["{LEVEL}", command.restrictions.level]])
      )
    );
  }
  if (
    command.restrictions &&
    command.restrictions.ownerOnly &&
    !globalConf.ownerIDs.includes(message.member.id)
  ) {
    return await message.reply(messages.permissions.missing_dev);
  }
  if (
    command.restrictions &&
    command.restrictions.serverOwnerOnly &&
    message.member.id !== message.guild.ownerID
  ) {
    return await message.reply(messages.permissions.missing_owner);
  }
  if (
    command.restrictions &&
    command.restrictions.permissions &&
    !message.member?.permissions.has(
      new Permissions(command.restrictions.permissions),
      true
    )
  )
    return await message.reply(
      replacer(
        messages.permissions.missing_permissions,
        new Map([
          [
            "{PERMISSIONS}",
            command.restrictions.permissions.map((e) => `\`${e}\``).join(" "),
          ],
        ])
      )
    );
  if (
    command.restrictions &&
    command.restrictions.permissions &&
    !message.member.permissions.has(
      new Permissions(command.restrictions.botPermissions),
      true
    )
  )
    return await message.reply(
      replacer(
        messages.permissions.missing_permissions_me,
        new Map([
          [
            "{PERMISSIONS}",
            command.restrictions.botPermissions
              .map((e) => `\`${e}\``)
              .join(" "),
          ],
        ])
      )
    );
  try {
    command.run(message, args);
  } catch (e) {
    await message.reply(
      replacer(messages.error.error_running_command, new Map([["{ERROR}", e]]))
    );
  }
}
