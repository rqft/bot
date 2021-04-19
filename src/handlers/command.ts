import {
  Message,
  MessageAttachment,
  MessageEmbed,
  MessageReaction,
  Permissions,
  User,
} from "discord.js";
import { commands } from "..";
import { escapeRegex } from "../functions/escapeRegex";
import { generateUsage } from "../functions/generateUsage";
import { getBotLevel } from "../functions/getBotLevel";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { replacer } from "../functions/replacer";
import globalConf from "../globalConf";
import { ICommand } from "../interfaces/ICommand";
import { messages } from "../messages";
const responses = new Map();
export async function reply(message: Message, ...data: [any?, any?]) {
  const response: Message = responses.get(message.id);
  if (response) {
    if (
      data[0]?.constructor === MessageAttachment ||
      data[1]?.constructor === MessageAttachment ||
      data[0]?.constructor === MessageEmbed ||
      data[1]?.constructor === MessageEmbed ||
      data[0]?.files?.length ||
      data[1]?.files?.length ||
      response.embeds.length ||
      response.attachments.size
    )
      response.delete();
    else return response.edit(...data);
  }
  const newResponse = await message.reply(...data);
  responses.set(message.id, newResponse);
}
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

  if (!command || !message.member) return;
  if (!message.guild) return await reply(message, messages.commands.dm);
  if (
    command.args &&
    command.args.filter((e) => e.required).length &&
    !(args.length >= command.args.filter((e) => e.required).length)
  )
    return await reply(
      message,

      replacer(messages.commands.args.missing_args, [
        ["{USER}", message.author.toString()],
        [
          "{MISSING_ARG}",
          Array.from(command.args.filter((e) => e.required).keys())
            .filter((v) => !Array.from(args.keys()).includes(v))
            .map((e) => `\`${command.args[e]?.name}\``)
            .join(", "),
        ],
        ["{USAGE}", generateUsage(command)],
      ])
    );
  if (
    command.restrictions &&
    command.restrictions.level !== undefined &&
    getBotLevel(message.member!).level < command.restrictions.level
  ) {
    return await reply(
      message,

      replacer(messages.permissions.missing_level, [
        ["{LEVEL}", command.restrictions.level],
      ])
    );
  }
  if (
    command.restrictions &&
    command.restrictions.ownerOnly &&
    !globalConf.ownerIDs.includes(message.member.id)
  ) {
    return await reply(message, messages.permissions.missing_dev);
  }
  if (
    command.restrictions &&
    command.restrictions.serverOwnerOnly &&
    message.member.id !== message.guild.ownerID
  ) {
    return await reply(message, messages.permissions.missing_owner);
  }
  if (
    command.restrictions &&
    command.restrictions.permissions &&
    !message.member?.permissions.has(
      new Permissions(command.restrictions.permissions),
      true
    )
  )
    return await reply(
      message,

      replacer(messages.permissions.missing_permissions, [
        [
          "{PERMISSIONS}",
          command.restrictions.permissions.map((e) => `\`${e}\``).join(" "),
        ],
      ])
    );
  if (
    command.restrictions &&
    command.restrictions.permissions &&
    !message.member.permissions.has(
      new Permissions(command.restrictions.botPermissions),
      true
    )
  )
    return await reply(
      message,

      replacer(messages.permissions.missing_permissions_me, [
        [
          "{PERMISSIONS}",
          command.restrictions.botPermissions.map((e) => `\`${e}\``).join(" "),
        ],
      ])
    );
  const filter = (reaction: MessageReaction, user: User) => {
    return (
      [
        globalConf.modules.commands.confirmation.emojis.yes,
        globalConf.modules.commands.confirmation.emojis.no,
      ].includes(reaction.emoji.name) && user.id === message.author.id
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

    await Promise.all([
      response.react(globalConf.modules.commands.confirmation.emojis.yes),
      response.react(globalConf.modules.commands.confirmation.emojis.yes),
    ]);
    const reactions = await response.awaitReactions(filter, {
      max: 1,
      time:
        command.confirmation.timeout ??
        globalConf.modules.commands.confirmation.defaultTimeout,
    });
    const reaction = reactions.first();
    if (!reaction) {
      run = false;
      await reply(
        message,

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
      await reply(message, messages.commands.confirmation.deny);
      run = false;
    } else if (reaction?.emoji.name === "✅") run = true;
  }
  message.channel.startTyping();
  try {
    if (!run) return;
    // message.channel.startTyping();
    command.run(message, args);
  } catch (e) {
    await reply(
      message,

      replacer(messages.error.error_running_command, [["{ERROR}", e]])
    );
  }
  message.channel.stopTyping();
}
