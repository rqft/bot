import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { parseTimeString } from "../../functions/parseTimeString";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "time",
  args: [
    {
      name: "time",
      required: true,
      type: "string",
    },
  ],
  async run(message, args) {
    const time = parseTimeString(args[0]);

    await message.reply(`${time}ms (${simpleGetLongAgo(Date.now() - time!)})`);
  },
} as ICommand;
