import { Message, MessageReaction, Permissions, User } from "discord.js";
import { commands } from "..";
import { CustomEmojis } from "../enums/customEmojis";
import { escapeRegex } from "../functions/escapeRegex";
import { getBotLevel } from "../functions/getBotLevel";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { replacer } from "../functions/replacer";
import globalConf from "../globalConf";
import { ICommand } from "../interfaces/ICommand";
import { messages } from "../messages";
export async function onCommand(message: Message): Promise<Message | void> {
  const pre = globalConf.modules.commands.prefixes;
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
  if (!message.guild || !message.member)
    return await message.reply(messages.commands.dm);
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
              .filter((v) => !Array.from(args.keys()).includes(v))
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
    getBotLevel(message.member!).level < command.restrictions.level
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
  const filter = (reaction: MessageReaction, user: User) => {
    return (
      ["✅", "❌"].includes(reaction.emoji.name) &&
      user.id === message.author.id
    );
  };
  var run = true;
  if (command.confirmation && command.confirmation.enabled) {
    const response = await message.reply(
      replacer(messages.commands.confirmation.response, [
        ["{USER}", message.author.toString()],
        ["{ACTION}", command.confirmation.action],
      ])
    );

    await Promise.all([response.react("✅"), response.react("❌")]);
    const reactions = await response.awaitReactions(filter, {
      max: 1,
      time: command.confirmation.timeout ?? 15000,
    });
    const reaction = reactions.first();
    if (!reaction) {
      run = false;
      await message.channel.send(
        replacer(messages.commands.confirmation.timeout, [
          [
            "{TIMEOUT}",
            simpleGetLongAgo(
              Date.now() - (command.confirmation.timeout ?? 15000)
            ),
          ],
        ])
      );
    }
    if (reaction?.emoji.name === "❌") {
      await message.channel.send(messages.commands.confirmation.deny);
      run = false;
    } else if (reaction?.emoji.name === "✅") run = true;
  }
  const res = await message.channel.send(CustomEmojis.GUI_TYPING);
  try {
    if (!run) return;
    await command.run(message, args).then(() => res.delete());
  } catch (e) {
    await message.reply(
      replacer(messages.error.error_running_command, new Map([["{ERROR}", e]]))
    );
  }
}
