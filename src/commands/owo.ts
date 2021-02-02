import { owoify } from "../functions/owoify";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "owo",
  usesArgs: true,
  description: "owowowowowowowowowowo",
  aliases: ["uwu", "owoify", "uwuify"],
  restrictions: {
    permissions: ["ADD_REACTIONS"],
  },
  usage: "<text: string>",
  async run(message, args) {
    await message.channel.send(owoify(args.join(" ")));
  },
} as ICommand;
