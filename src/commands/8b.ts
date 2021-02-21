import { MessageEmbed } from "discord.js";
import { random } from "../functions/random";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { responses } from "../maps/8ball";

module.exports = {
  name: "8b",
  description: "eight ball",
  usage: "<q: text>",
  aliases: ["eightball", "8ball"],
  async run(message, args) {
    const query = args.join(" ");
    const response = random(responses);
    await message.reply(
      new MessageEmbed({
        description: `**You Asked**: ${query}
**Response**: ${response}`,
        color: Color.embed,
      })
    );
  },
} as ICommand;
