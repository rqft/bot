import { api } from "../../functions/api";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  module: "other",
  name: "words",
  restrictions: {
    level: 0,
  },
  args: [
    {
      name: "query",
      required: true,
      type: "text",
    },
  ],
  async run(message, args) {
    const query = args.join(" ");
    const _words = (await api(
      "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt",
      "text"
    )) as string;
    const words = _words.split("\n").sort((a, b) => b.length - a.length);
    await message.reply(
      words
        .filter((e) => e.includes(query))
        .map((e) => e.replace(new RegExp(query, "gi"), "__**$&**__"))
        .slice(0, 50)
        .join(", "),
      { split: { char: " " } }
    );
  },
} as ICommand;
