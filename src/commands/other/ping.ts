import { client } from "../..";
import {
  simpleGetLongAgo,
  simpleShortGetLongAgo,
} from "../../functions/getLongAgo";
import { replacer } from "../../functions/replacer";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "ping",
  async run(message, _args) {
    var diff =
      Date.now() - (message.editedTimestamp ?? message.createdTimestamp);
    message.reply(
      replacer(messages.commands.other.ping, [
        ["{DIFF}", simpleGetLongAgo(Date.now() - diff)],
        ["{HEARTBEAT}", client.ws.ping + "ms"],
        ["{UPTIME}", simpleShortGetLongAgo(Date.now() - client.uptime!)],
      ])
    );
  },
} as ICommand;
