import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "test",
  description: "TESTING",
  restrictions: {
    ownerOnly: true,
  },
  async run(message) {
    await message.channel.send(":white_check_mark:");
  },
} as ICommand;
