import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "clean",
  restrictions: {
    level: 50,
    botPermissions: ["MANAGE_MESSAGES", "MANAGE_CHANNELS"],
    permissions: ["MANAGE_MESSAGES", "MANAGE_CHANNELS"],
  },
  args: [
    {
      name: "type",
      required: true,
      type: "string",
    },
    {
      name: "count",
      required: true,
      type: "number",
    },
  ],
  async run(message, args) {
    const type = args[0]?.toLowerCase()!;
    if (!["all", "user", "bots"].includes(type))
      return await message.reply(
        `Invalid sub-command. Try: ${["all", "user", "bots"].join(", ")}`
      );
  },
} as ICommand;
