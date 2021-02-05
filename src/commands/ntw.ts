import { numToWords } from "../functions/numToWords";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "ntw",
  aliases: ["numbersToWords"],
  restrictions: {
    permissions: ["MANAGE_MESSAGES", "ADD_REACTIONS"],
  },
  usesArgs: true,
  usage: "<num: string | number>",
  async run(message, args) {
    const words = numToWords(args.join(" "));
    if (!words) return await message.channel.send("That's not a number!");
    if (words.includes("undefined"))
      return await message.channel.send("That's too big of a number!");
    await message.channel.send(
      `\`${args.join(" ")}\` => \`\`\`\n${words}\`\`\``
    );
  },
} as ICommand;