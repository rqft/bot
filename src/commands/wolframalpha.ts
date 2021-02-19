import { MessageEmbed } from "discord.js";
import { config } from "../config";
import { api } from "../functions/api";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "search",
  usesArgs: true,
  usage: "<query: text>",
  description: "search for stuff",
  async run(message, args) {
    const res = await api(
      `http://api.wolframalpha.com/v1/result?appid=${
        config.global.keys.wolframAlpha
      }&i=${encodeURIComponent(args.join(" "))}`,
      "text"
    );
    const emb = new MessageEmbed();
    emb.addField("Query", args.join(" "));
    emb.addField("Result", res);
    emb.setFooter(`(Done in ${Date.now() - message.createdTimestamp}ms)`);
    emb.setColor(Color.embed);
    await message.channel.send(emb);
  },
} as ICommand;
