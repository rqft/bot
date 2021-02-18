import { getUser } from "../functions/getUser";
import { makeCodeblock } from "../functions/makeCodeblock";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "ban",
  restrictions: {
    permissions: ["BAN_MEMBERS"],
    guildOnly: true,
  },
  usage: "<user: User> [reason: string]",
  async run(message, args) {
    const target = await getUser(message, args, false, 0);
    if (!target)
      return await message.channel.send(
        "You need to supply a **bannable** user!"
      );
    const reason = args[1] ? args.slice(1).join(" ") : undefined;
    if (
      message.guild?.member(target) &&
      !message.guild.member(target)?.bannable
    )
      return await message.channel.send(
        "You need to supply a **bannable** user!"
      );
    await message.guild?.members.ban(target, {
      reason: reason,
      days: 1,
    });
    await message.channel.send(
      `Banned ${target} ${
        reason ? `with reason: ${makeCodeblock(reason, 20)}` : ""
      }`
    );
  },
} as ICommand;
