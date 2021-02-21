import { TextChannel } from "discord.js";
import { getChannel } from "../functions/getChannel";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "clean",
  restrictions: {
    permissions: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
    guildOnly: true,
  },
  usage: "<channel: TextChannel> [count: number] [user: User]",
  description: "delete messages quickly",
  async run(message, args) {
    const amount = parseInt(args[1] ?? "3");
    const channel = getChannel(message, args, false, 0) as TextChannel;
    await channel.bulkDelete(amount, true);
    const res = await message.reply(
      `Deleted ${amount} messages from ${channel}`
    );
    const c = await channel.send(
      `${message.author} Deleted ${amount} messages in this channel`
    );
    setTimeout(() => {
      res.delete();
      c.delete();
    }, 1000);
  },
} as ICommand;
