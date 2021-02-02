import { api } from "../functions/api";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "cate",
  aliases: ["catpic"],
  async run(message) {
    await message.channel.send(
      (await api("http://aws.random.cat/meow", "json")).file
    );
  },
} as ICommand;
