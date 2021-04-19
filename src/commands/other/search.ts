import { MessageEmbed } from "discord.js";
import { api } from "../../functions/api";
import { Color } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { Secrets } from "../../secrets";
module.exports = {
  name: "search",
  args: [
    {
      name: "query",
      required: true,
      type: "text",
    },
  ],
  async run(message, args) {
    const res = await api(
      `http://api.wolframalpha.com/v1/result?appid=${
        Secrets.Key.wolframAlpha
      }&i=${encodeURIComponent(args.join(" "))}`,
      "text"
    );
    const emb = new MessageEmbed();
    emb.addField("Query", args.join(" "));
    emb.addField("Result", res);
    emb.setFooter(`(Done in ${Date.now() - message.createdTimestamp}ms)`);
    emb.setColor(Color.embed);
    await reply(message, emb);
  },
} as ICommand;
