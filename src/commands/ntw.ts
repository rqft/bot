import { capitalizeWords } from "../functions/capitalizeWords";
import { numToWords } from "../functions/numToWords";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "ntw",
  aliases: ["numbersToWords"],
  restrictions: {},
  usesArgs: true,
  usage: "<num: string | number>",
  description: "numbers to words",
  async run(message, args) {
    const words = numToWords(args.join(" "));
    if (!words) return await message.reply("That's not a number!");
    if (words.includes("undefined"))
      return await message.reply("That's too big of a number!");
    await message.reply(
      `\`${args.join(" ")}\` => \`\`\`\n${capitalizeWords(words)}\`\`\``
    );
  },
} as ICommand;
