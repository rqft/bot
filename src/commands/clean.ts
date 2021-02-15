import { GuildChannel, TextChannel } from "discord.js";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "clean",
  restrictions: {
    ownerOnly: true,
    guildOnly: true,
  },
  usage: "[count: number]",

  async run(message, args) {
    const amount = parseInt(args[0] ?? "3");
    const a = await ((message.channel as GuildChannel) as TextChannel).bulkDelete(
      amount,
      true
    );
    await message.channel.send(
      `Deleted ${a.size} messages from ${message.channel}`
    );
  },
} as ICommand;
