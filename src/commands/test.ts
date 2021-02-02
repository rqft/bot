import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "test",
  restrictions: {
    serverOwnerOnly: true,
  },
  usesArgs: true,
  usage: "<a: string>",
  async run(message) {
    await message.channel.send(":white_check_mark:");
  },
} as ICommand;
