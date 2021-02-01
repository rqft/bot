import { MessageEmbed } from "discord.js";
import { client as c } from "..";
import { config as conf } from "../config";
import { embedColor } from "../globals";
import { ICommand } from "../interfaces/ICommand";
module.exports = {
  name: "eval",
  description: "Run code",
  usage: "<code: text>",
  restrictions: {
    ownerOnly: true,
  },
  async run(message, args: string[]) {
    var lang: "json" | "ts" | "js" = "ts";
    const code = args.join(" ").replace(/\`{3}\n?(.+)?/g, "");
    const input = `\`\`\`ts\n${code}\`\`\``;
    var str = null;
    try {
      const client = c;
      client;
      const config = conf;
      config;
      str = eval(code);
      const embed = new MessageEmbed();
      embed.setColor(embedColor);
      embed.setTitle("✅ Eval Success");
      embed.addField("Input", input);
      if (typeof str == "object") {
        str = JSON.stringify(str, null, 2);
        lang = "json";
      }
      const output = `\`\`\`${lang}\n${str}\`\`\``;
      embed.addField("Output", output);
      await message.channel.send(embed);
    } catch (e) {
      str = e;
      const embed = new MessageEmbed();
      embed.setColor(embedColor);
      embed.setTitle("⛔ Eval Failed");
      embed.addField("Input", input);
      const output = `\`\`\`ts\n${str}\`\`\``;
      embed.addField("Output", output);
      await message.channel.send(embed);
    }
  },
} as ICommand;
