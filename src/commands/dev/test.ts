import { ICommand } from "../../interfaces/ICommand";
import _utils from "../../utils";
module.exports = {
  name: "testcmd",
  confirmation: {
    action: "dev.test",
    enabled: true,
    timeout: 15000,
  },
  args: [
    {
      name: "string",
      type: "text",
      required: true,
    },
  ],
  restrictions: {
    ownerOnly: true,
  },
  async run(message, args) {
    await message.reply(_utils.other.escapeString(args.join(" ")));
  },
} as ICommand;
