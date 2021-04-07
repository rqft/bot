import { client } from "../..";
import { simpleShortGetLongAgo } from "../../functions/getLongAgo";
import { replacer } from "../../functions/replacer";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "ping",
  async run(message, _args) {
    var diff = message.editedTimestamp
      ? Date.now() - message.editedTimestamp
      : Date.now() - message.createdTimestamp;
    message.reply(
      replacer(messages.commands.other.ping, [
        ["{DIFF}", simpleShortGetLongAgo(Date.now() - Math.abs(diff))],
        ["{HEARTBEAT}", client.ws.ping + "ms"],
        ["{UPTIME}", simpleShortGetLongAgo(Date.now() - client.uptime!)],
      ])
    );
  },
} as ICommand;
