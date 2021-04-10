import { GuildChannel } from "discord.js";
import { replacer } from "../../functions/replacer";
import { search_guildMember } from "../../functions/searching/guildMember";
import { checkTargets } from "../../functions/targeting/checkTargets";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "unmute",
  args: [
    {
      name: "user",
      required: true,
      type: "GuildMember",
    },
  ],
  aliases: ["youcantalknow"],
  restrictions: {
    botPermissions: ["MANAGE_CHANNELS", "MANAGE_MESSAGES", "MANAGE_ROLES"],
    level: 50,
    permissions: ["MANAGE_MESSAGES", "MANAGE_CHANNELS"],
  },
  async run(message, args) {
    const user = await search_guildMember(args[0]!, message.guild!);
    if (!user) return reply(message, messages.targeting.not_found.guild_member);
    if (user.id == message.author.id)
      return await reply(message, messages.targeting.actor_cant_self);
    const tg = checkTargets(message.member!, user);
    if (!tg.checks.globalAdm || !tg.checks.level || !tg.checks.roles)
      return reply(message, tg.messages.join("\n"));
    if (
      !(message.channel as GuildChannel).permissionOverwrites
        .array()
        .find((e) => e.id === user.id && e.deny.has("SEND_MESSAGES"))
    )
      return await reply(
        message,

        replacer(messages.commands.infractions.not_muted, [
          ["{USER}", user.toString()],
        ])
      );
    try {
      (message.channel as GuildChannel).permissionOverwrites
        .get(user.id)
        ?.delete();
    } catch {
      return reply(message, messages.commands.infractions.failed_unmute);
    }
    return reply(
      message,

      replacer(messages.commands.infractions.unmuted_member, [
        ["{USER}", user.toString()],
      ])
    );
  },
} as ICommand;
