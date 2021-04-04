import { GuildChannel } from "discord.js";
import { replacer } from "../../functions/replacer";
import { search_guildMember } from "../../functions/searching/guildMember";
import { checkTargets } from "../../functions/targeting/checkTargets";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "mute",
  args: [
    {
      name: "user",
      required: true,
      type: "GuildMember",
    },
  ],
  restrictions: {
    botPermissions: ["MANAGE_CHANNELS", "MANAGE_MESSAGES", "MANAGE_ROLES"],
    level: 50,
    permissions: ["MANAGE_MESSAGES", "MANAGE_CHANNELS"],
  },
  aliases: ["stoptalking", "shutup"],
  async run(message, args) {
    const user = await search_guildMember(args[0]!, message.guild!);
    if (!user) return message.reply(messages.targeting.not_found.guild_member);
    if (user.id == message.author.id)
      return await message.reply(messages.targeting.actor_cant_self);
    const tg = checkTargets(message.member!, user);
    if (!tg.checks.globalAdm || !tg.checks.level || !tg.checks.roles)
      return message.reply(tg.messages.join("\n"));
    if (
      (message.channel as GuildChannel).permissionOverwrites
        .array()
        .find((e) => e.id === user.id && e.deny.has("SEND_MESSAGES"))
    )
      return await message.reply(
        replacer(messages.commands.infractions.already_muted, [
          ["{USER}", user.toString()],
        ])
      );
    try {
      (message.channel as GuildChannel).createOverwrite(user, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
      });
    } catch {
      return message.reply(messages.commands.infractions.failed_mute);
    }
    return message.reply(
      replacer(messages.commands.infractions.muted_member, [
        ["{USER}", user.toString()],
      ])
    );
  },
} as ICommand;
