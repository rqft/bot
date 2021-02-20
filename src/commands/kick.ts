import { getUser } from "../functions/getUser";
import { makeCodeblock } from "../functions/makeCodeblock";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "kick",
  restrictions: {
    permissions: ["KICK_MEMBERS"],
    guildOnly: true,
  },
  description: "kick someone",
  usage: "<user: User> [reason: string]",
  async run(message, args) {
    const targetUser = await getUser(message, args, false, 0);
    if (!targetUser)
      return await message.channel.send(
        "You need to supply a **kickable** user!"
      );
    const member = message.guild?.member(targetUser);
    if (!member)
      return await message.channel.send(
        "You need to supply a **kickable** user!"
      );
    const reason = args[1] ? args.slice(1).join(" ") : undefined;
    if (!member.kickable)
      return await message.channel.send(
        "You need to supply a **kickable** user!"
      );
    await member.kick(reason);
    await message.channel.send(
      `Kicked ${targetUser} ${
        reason ? `with reason: ${makeCodeblock(reason, 20)}` : ""
      }`
    );
  },
} as ICommand;
