import { TextChannel } from "discord.js";
import { getChannel } from "../functions/getChannel";
import { getUser } from "../functions/getUser";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "clean",
  restrictions: {
    permissions: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
    guildOnly: true,
  },
  usage: "<channel: TextChannel> [count: number] [user: User]",

  async run(message, args) {
    const amount = parseInt(args[1] ?? "3");
    const user = await getUser(message, args, false, 2);
    const channel = getChannel(message, args, false, 0) as TextChannel;
    await channel.bulkDelete(
      (
        await channel.messages.fetch({ before: message.id, limit: amount })
      ).filter((e) => (user ? e.author == user : true)),
      true
    );
    const res = await message.channel.send(
      `Deleted ${amount} messages from ${channel}`
    );
    const c = await channel.send(
      `${message.author} Deleted ${amount} messages in this channel ${
        user ? user : ""
      }`
    );
    setTimeout(() => {
      res.delete();
      c.delete();
    }, 1000);
  },
} as ICommand;
