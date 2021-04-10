import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { parseTimeString } from "../../functions/parseTimeString";
import { reply } from "../../handlers/command";
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
    const time = parseTimeString(args[0]!);
    await reply(message, `${time}ms (${simpleGetLongAgo(Date.now() - time!)})`);
  },
} as ICommand;
