import { MessageEmbed } from "discord.js";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "owo",
  // usesArgs: true,
  description: "OWO",
  aliases: ["uwu", "owoify", "uwuify"],
  usage: "[text]",
  async run(message, args) {
    const text = args.length
      ? args.join(" ")
      : await message.channel.messages
          .fetch({ limit: 1 })
          .then((e) => e.filter((e) => e !== message).first()?.content);
    message.channel.send(
      new MessageEmbed({
        description: text!.replace(/[lr]/g, "w").replace(/[LR]/g, "W"),
      })
    );
  },
} as ICommand;
