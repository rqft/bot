import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "cooldown-test",
  description: "owowowowowowowowowowo",
  cooldown: 5,
  async run(message) {
    await message.channel.send("ok");
  },
} as ICommand;
