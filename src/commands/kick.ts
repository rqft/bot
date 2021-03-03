import { GuildChannel, TextChannel } from "discord.js";
import { getUser } from "../functions/getUser";
import { makeCodeblock } from "../functions/makeCodeblock";
import { ICommand } from "../interfaces/ICommand";
const kickmessage = "You need to supply a **kickable** user!";
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
    if (!targetUser) return await message.channel.send(kickmessage);
    const member = message.guild?.members.cache.get(targetUser.id);
    if (!member) return await message.channel.send(kickmessage);
    const reason = args[1] ? args.slice(1).join(" ") : undefined;
    if (!member.kickable) return await message.channel.send(kickmessage);
    await member.kick(reason);
    await message.channel.send(
      `Kicked ${targetUser} ${
        reason ? `with reason: ${makeCodeblock(reason, 20)}` : ""
      }`
    );
    const inv = await (message.channel as GuildChannel &
      TextChannel).createInvite();
    await member.send(
      `You have been kicked from **${message.guild?.name}** ${
        reason ? `with reason: ${makeCodeblock(reason, 20)}` : ""
      }
      
Here's an invite if you want to join back.
${inv.url}`
    );
  },
} as ICommand;
