import { MessageEmbed } from "discord.js";
import { config } from "../config";
import { api } from "../functions/api";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { CustomEmojis } from "../maps/customEmojis";

module.exports = {
  name: "search",
  usesArgs: true,
  usage: "<query: text>",
  description: "search for stuff",
  async run(message, args) {
    const ret = await message.reply(CustomEmojis.GUI_TYPING);
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
    await message.reply(emb);
    await ret.delete();
  },
} as ICommand;
