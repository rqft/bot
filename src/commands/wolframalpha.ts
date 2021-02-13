import { config } from "../config";
import { api } from "../functions/api";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "api",
  usesArgs: true,
  usage: "<query: text>",
  async run(message, args) {
    const res = await api(
      `http://api.wolframalpha.com/v1/result?appid=${
        config.global.keys.wolframAlpha
      }&i=${encodeURIComponent(args.join(" "))}`,
      "text"
    );
    await message.channel.send(
      `${res}

(Done in ${Date.now() - message.createdTimestamp}ms)`
    );
  },
} as ICommand;
