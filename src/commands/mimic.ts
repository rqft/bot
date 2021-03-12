import { GuildChannel, TextChannel } from "discord.js";
import { client } from "..";
import { getUser } from "../functions/getUser";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "mimic",
  usage: "<user: User> <message: text>",
  usesArgs: true,
  restrictions: {
    neededPerms: ["MANAGE_WEBHOOKS"],
    guildOnly: true,
  },
  cooldown: 10,
  description: "mimic people",
  async run(message, args) {
    const user = await getUser(message, args, false);
    if (!user) return await message.reply("unknown user");
    if (user.id == client.user!.id) return await message.reply("no");
    const msg = args.slice(1).join(" ").split("-d ").join(" ");
    if (args.slice(1).join(" ").startsWith("-d")) await message.delete();
    if (!msg) return await message.reply("You need to provide a message");
    const name = message.guild?.members.cache.get(user.id)
      ? message.guild.members.cache.get(user.id)?.displayName ?? user.username
      : user.username;
    const wh = await ((message.channel as GuildChannel) as TextChannel).createWebhook(
      name,
      {
        avatar: user.avatarURL() ?? user.defaultAvatarURL,
      }
    );
    await wh.send(msg, { files: message.attachments.array() });
    await wh.delete();
  },
} as ICommand;
