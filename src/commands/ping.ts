import { client } from "..";
import { simpleGetLongAgo } from "../functions/getLongAgo";
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
      `Ping in ${simpleGetLongAgo(
        Date.now() - client.ws.ping
      )}; Message replied ${simpleGetLongAgo(message.createdTimestamp)}`
    );
  },
} as ICommand;
