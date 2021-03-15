import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "test",
  args: [
    {
      name: "argument",
      required: true,
      type: "any",
    },
  ],
  async run(message) {
    await message.reply("✅");
  },
} as ICommand;
