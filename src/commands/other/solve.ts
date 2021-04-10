import { MessageEmbed } from "discord.js";
import { api } from "../../functions/api";
import { Color } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { Secrets } from "../../secrets";
module.exports = {
  name: "solve",
  args: [
    {
      name: "query",
      required: true,
      type: "text",
    },
  ],
  run: async (message, args) => {
    const query = `solve ${args.join(" ")}`;
    const url = `http://api.wolframalpha.com/v2/query?appid=${
      Secrets.Key.wolframAlpha
    }&input=${encodeURIComponent(
      query
    )}&podstate=Step-by-step%20solution&output=json&scanner=Solve`;
    const result = await api(url, "json");
    if (!result.queryresult.success) {
      return await reply(
        message,

        `:no_entry: Error (${result.queryresult.error.code}): ${result.queryresult.error.msg}`
      );
    }
    const emb = new MessageEmbed();
    emb.setTitle(query);
    if (result.queryresult.pods) {
      emb.addField("Answer", result.queryresult.pods[0].subpods[0].plaintext);
      emb.addField(
        "Steps",
        `\`\`\`` +
          (result.queryresult.pods[0].subpods[1].plaintext as string).replace(
            /\|/g,
            ""
          ) +
          `\`\`\``
      );
    } else {
      const ex = await api(
        `http://api.mathjs.org/v4/?expr=${encodeURIComponent(args.join(" "))}`,
        "text"
      );
      emb.addField("Answer", `\`${ex}\``);
    }
    emb.setColor(Color.embed);
    await reply(message, emb);
  },
} as ICommand;
