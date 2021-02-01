import { ICommand } from "../interfaces/ICommand";

module.exports = {
  on: "fetchMessages",
  usesArgs: true,
  description: "owowowowowowowowowowo",
  aliases: ["uwu", "owoify", "uwuify"],
  usage: "[count: number]",
  async run(message) {
    const messages = await message.channel.messages.fetch({
      before: message.id,
      limit: 1,
    });
    await message.channel.send(
      ".\n" +
        messages
          .array()
          .map((e) => `${e.content}`)
          .join("\n")
          .replace(/[lr]/g, "w")
          .replace(/[LR]/g, "W")
    );
  },
} as ICommand;
