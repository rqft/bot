import { client } from "../..";
import { replacer } from "../../functions/replacer";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "ping",
  restrictions: {
    level: 5,
  },
  async run(message, _args) {
    message.reply(
      replacer(messages.commands.other.ping, [
        ["{DIFF}", Date.now() - message.createdTimestamp],
        ["{HEARTBEAT}", client.ws.ping],
      ])
    );
  },
} as ICommand;
