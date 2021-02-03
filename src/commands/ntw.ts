import { numToWords } from "../functions/numToWords";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "ntw",
  aliases: ["numbersToWords"],
  restrictions: {
    permissions: ["MANAGE_MESSAGES", "ADD_REACTIONS"],
  },
  async run(message, args) {
    const words = numToWords(args.join(" "));
    await message.channel.send(
      `\`${args.join(" ")}\` => \`\`\`\n${words}\`\`\``
    );
  },
} as ICommand;
