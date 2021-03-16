import { replacer } from "../../functions/replacer";
import { search_guildMember } from "../../functions/searching/guildMember";
import { checkTargets } from "../../functions/targeting/checkTargets";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "kick",
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
  async run(message, args) {
    const user = await search_guildMember(args[0]!, message.guild!);
    if (!user) return message.reply(messages.targeting.not_found.guild_member);
    if (user.id == message.author.id)
      return await message.reply(messages.targeting.actor_cant_self);
    const reason = args.slice(1).join(" ");
    const tg = checkTargets(message.member!, user);
    if (!tg.checks.globalAdm || !tg.checks.level || !tg.checks.roles)
      return message.reply(tg.messages.join("\n"));
    try {
      user.ban({ reason });
    } catch {
      return message.reply(messages.commands.infractions.failed_ban);
    }
    return message.reply(
      replacer(
        messages.commands.infractions.banned_member,
        new Map([
          ["{USER}", user.toString()],
          ["{REASON}", reason ? `with reason \`${reason}\`` : ""],
        ])
      )
    );
  },
} as ICommand;
