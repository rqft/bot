import { client } from "../..";
// import { simpleShortGetLongAgo } from "../../functions/getLongAgo";
import { simpleShortGetLongAgo } from "../../functions/getLongAgo";
import { random } from "../../functions/random";
import { replacer } from "../../functions/replacer";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "ping",
  async run(message, _args) {
    setTimeout(() => {
      const diff = Date.now() - message.createdTimestamp;
      console.log(diff, diff > 200);
      var choices = messages.commands.other.ping.normal;
      if (diff > 200) choices = messages.commands.other.ping.slow;
      if (diff < 70) messages.commands.other.ping.fast;
      message.reply(
        replacer(random(choices) + messages.commands.other.ping.base, [
          ["{DIFF}", diff + "ms"],
          ["{HEARTBEAT}", client.ws.ping + "ms"],
          ["{UPTIME}", simpleShortGetLongAgo(Date.now() - client.uptime!)],
        ])
      );
    }, 5000);
  },
} as ICommand;
