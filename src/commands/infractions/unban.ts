import { replacer } from "../../functions/replacer";
import { search_user } from "../../functions/searching/user";
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
    if (!user) return message.reply(messages.targeting.not_found.user);
    if (user.id == message.author.id)
      return await message.reply(messages.targeting.actor_cant_self);
    const reason = args.slice(1).join(" ");
    const b = await message.guild?.fetchBans();
    const alreadyBanned = b && b.has(user.id);
    if (!alreadyBanned)
      return await message.reply(
        replacer(
          messages.commands.infractions.not_banned,
          new Map([["{USER}", user.toString()]])
        )
      );
    try {
      message.guild?.members.unban(user, reason);
    } catch {
      return message.reply(messages.commands.infractions.failed_unban);
    }
    return message.reply(
      replacer(messages.commands.infractions.unbanned_member, [
        ["{USER}", user.toString()],
        ["{REASON}", reason ? `with reason \`${reason}\`` : ""],
      ])
    );
  },
} as ICommand;
