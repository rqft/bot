import { MessageEmbed } from "discord.js";
import { config } from "../config";
import { api } from "../functions/api";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "solve",
  restrictions: {
    // ownerOnly: true,
  },
  usesArgs: true,
  usage: "<expression: MathString>",
  async run(message, args) {
    const query = `solve ${args.join(" ")}`;
    const url = `http://api.wolframalpha.com/v2/query?appid=${
      config.global.keys.wolframAlpha
    }&input=${encodeURIComponent(
      query
    )}&podstate=Step-by-step%20solution&output=json&scanner=Solve`;
    const result = await api(url, "json");
    console.log(result.queryresult);
    if (!result.queryresult.success) {
      await message.channel.send(
        `:no_entry: Error (${result.queryresult.error.code}): ${result.queryresult.error.msg}`
      );
      return console.log(result);
    }
    const emb = new MessageEmbed();
    emb.setTitle(query);
    if (result.queryresult.pods) {
      emb.addField("Answer", result.queryresult.pods[0].subpods[0].plaintext);
      emb.addField(
        "Steps",
        result.queryresult.pods[0].subpods[1].plaintext
          .replace(/\|/g, ">")
          .replace("Answer: >", "Answer:")
      );
    } else {
      const ex = await api(
        `http://api.mathjs.org/v4/?expr=${encodeURIComponent(args.join(" "))}`,
        "text"
      );
      emb.addField("Answer", ex);
    }
    await message.channel.send(emb);
  },
} as ICommand;
