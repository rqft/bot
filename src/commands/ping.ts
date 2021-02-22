import { client } from "..";
import { ICommand } from "../interfaces/ICommand";
import { CustomEmojis } from "../maps/customEmojis";

module.exports = {
  name: "ping",
  usage: "",
  usesArgs: false,
  description: "get bot ping",
  async run(message) {
    const ret = await message.reply(CustomEmojis.GUI_TYPING);
    await ret.delete();
    await message.reply(
      `Ping @${client.ws.ping}ms; Message replied @${
        Date.now() - message.createdTimestamp
      }ms`
    );
  },
} as ICommand;
