import Discord, { MessageEmbed } from "discord.js";
import { client as c } from "..";
import { config as conf } from "../config";
import { api } from "../functions/api";
import { capitalizeWords } from "../functions/capitalizeWords";
import { arrayContainsAll } from "../functions/checkArrayContainsAll";
import { fetchCommand as fc } from "../functions/fetchCommand";
import * as globals from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { decor } from "../maps/emojiEnum";

module.exports = {
  name: "eval",
  description: "Run code",
  usage: "<code: text | Attachment>",
  restrictions: {
    ownerOnly: true,
  },
  async run(message, args: string[]) {
    var lang: "json" | "ts" | "js" = "ts";
    const code = args.length
      ? args.join(" ").replace(/\`{3}\n?(.+)?/g, "")
      : await api(
          message.attachments.array()[0]
            ? message.attachments.array()[0]!.url
            : "undefined",
          "text"
        );
    const input = `\`\`\`ts\n${code}\`\`\``;
    var str = null;
    try {
      const client = c;
      const config = conf;
      const fetchCommand = fc;
      const cf = arrayContainsAll;
      const discord = Discord;
      const char = globals.Chars;
      client;
      config;
      fetchCommand;
      cf;
      discord;
      char;
      str = eval(code);
      const embed = new MessageEmbed();
      embed.setColor(globals.Color.embed);
      embed.setTitle(`${decor.Emojis.WHITE_CHECK_MARK} Eval Success`);
      embed.addField("Input", input);

      if (typeof str == "string") {
        str = `"${str}"`;
      }
      // if (str instanceof Promise) str = await str;
      if (str instanceof Object) {
        str = JSON.stringify(str, null, 2);
        lang = "json";
      }
      const output = `\`\`\`${lang}\n${str}\`\`\``;
      embed.addField(
        `Output - ${capitalizeWords(typeof str)} (${str.constructor.name})`,
        output
      );
      await message.reply(embed);
    } catch (e) {
      str = e;

      const embed = new MessageEmbed();
      embed.setColor(globals.Color.embed);
      embed.setTitle(`${decor.Emojis.NO_ENTRY} Eval Failed`);
      embed.addField("Input", input.slice(0, 500));
      const output = `\`\`\`ts\n${str}\`\`\``;
      embed.addField(`Output - ${capitalizeWords(typeof str)}`, output);
      await message.reply(embed);
    }
  },
} as ICommand;
