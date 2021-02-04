import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "test",
  description: "AAAAAAA",
  async run(message) {
    await message.channel.send(":white_check_mark:");
  },
} as ICommand;
