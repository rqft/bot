import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "test",
  async run(message) {
    await message.reply("✅");
  },
} as ICommand;
