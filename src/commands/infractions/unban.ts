import { replacer } from "../../functions/replacer";
import { search_user } from "../../functions/searching/user";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "unban",
  args: [
    {
      name: "user",
      required: true,
      type: "User",
    },
    {
      name: "reason",
      required: false,
      type: "text",
    },
  ],
  restrictions: {
    botPermissions: ["BAN_MEMBERS"],
    level: 70,
    permissions: ["BAN_MEMBERS"],
  },
  async run(message, args) {
    const user = await search_user(args[0]!);
    if (!user) return reply(message, messages.targeting.not_found.user);
    if (user.id == message.author.id)
      return await reply(message, messages.targeting.actor_cant_self);
    const reason = args.slice(1).join(" ");
    const b = await message.guild?.fetchBans();
    const alreadyBanned = b && b.has(user.id);
    if (!alreadyBanned)
      return await reply(
        message,

        replacer(messages.commands.infractions.not_banned, [
          ["{USER}", user.toString()],
        ])
      );
    try {
      message.guild?.members.unban(user, reason);
    } catch {
      return reply(message, messages.commands.infractions.failed_unban);
    }
    return reply(
      message,

      replacer(messages.commands.infractions.unbanned_member, [
        ["{USER}", user.toString()],
        ["{REASON}", reason ? `with reason \`${reason}\`` : ""],
      ])
    );
  },
} as ICommand;
