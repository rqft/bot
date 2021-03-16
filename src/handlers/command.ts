import { Message, Permissions } from "discord.js";
import { commands } from "..";
import { escapeRegex } from "../functions/escapeRegex";
import { getBotLevel } from "../functions/getBotLevel";
import { replacer } from "../functions/replacer";
import globalConf from "../globalConf";
import { ICommand } from "../interfaces/ICommand";
import { messages } from "../messages";
export async function onCommand(message: Message): Promise<Message | void> {
  if (!globalConf) return;
  const pre = globalConf.modules.commands.prefixes;
  if (globalConf.modules.commands.mentionPrefix) {
    pre.push(`<@!760143615124439040>`);
    pre.push(`<@760143615124439040>`);
  }
  const prefixRegex = new RegExp(
    `^(${pre.map((e) => escapeRegex(e)).join("|")})( ?)`,
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
    command.args &&
    command.args.filter((e) => e.required).length &&
    !(args.length >= command.args.filter((e) => e.required).length)
  )
    return await message.reply(
      replacer(
        messages.commands.args.missing_args,
        new Map([
          ["{USER}", message.author.toString()],
          [
            "{MISSING_ARG}",
            Array.from(command.args.filter((e) => e.required).keys())
              .filter(function (v) {
                return !Array.from(args.keys()).includes(v);
              })
              .map((e) => `\`${command.args[e]?.name}\``)
              .join(", "),
          ],
          [
            "{USAGE_MESSAGE}",
            replacer(
              messages.commands.args.missing_args_usage,
              new Map([
                [
                  "{USAGE}",
                  command.args
                    .map((e) => {
                      return `${e.required ? "<" : "("}${e.name}: ${e.type}${
                        e.required ? ">" : ")"
                      }`;
                    })
                    .join(" "),
                  // lol
                ],
              ])
            ),
          ],
        ])
      )
    );
  if (
    command.restrictions &&
    command.restrictions.level !== undefined &&
    getBotLevel(message.member!) < command.restrictions.level
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
