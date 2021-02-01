import { owoify } from "../functions/owoify";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  on: "owo",
  usesArgs: true,
  description: "owowowowowowowowowowo",
  aliases: ["uwu", "owoify", "uwuify"],
  usage: "<text: string>",
  async run(message, args) {
    await message.channel.send(owoify(args.join(" ")));
  },
} as ICommand;
