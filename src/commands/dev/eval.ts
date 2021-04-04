import Discord, { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { client as c } from "../..";
import { Emojis } from "../../enums/emojis";
import { api } from "../../functions/api";
import { capitalizeWords } from "../../functions/capitalizeWords";
import globalConf from "../../globalConf";
import * as globals from "../../globals";
import { ICommand } from "../../interfaces/ICommand";
import _utils from "../../utils";
module.exports = {
  name: "eval",
  restrictions: {
    ownerOnly: true,
  },
  args: [
    {
      name: "code",
      required: false,
      type: "any",
    },
  ],
  async run(message, args: string[]) {
    var lang: "json" | "ts" | "js" = "ts";
    const hasAttachment = message.attachments.array()[0]
      ? `// Has Attachment\n`
      : "";
    const code = args.length
      ? args.join(" ").replace(/\`{3}\n?(.+)?/g, "")
      : await api(
          message.attachments.array()[0]
            ? message.attachments.array()[0]!.url
            : "https://raw.githubusercontent.com/arcy-at/arcy-at/main/bot-default-eval-file.js",
          "text"
        );
    // const input = `\`\`\`ts\n${code.slice(0, 1000)}\`\`\``;
    var str = null;
    try {
      const client = c;
      const config = globalConf;
      const discord = Discord;
      const char = globals.Chars;
      client;
      config;
      discord;
      char;
      const utils = _utils;
      utils;
      const fs = fetch;
      fs;
      str = eval(code);
      const embed = new MessageEmbed();
      embed.setColor(globals.Color.embed);
      embed.setTitle(`${Emojis.WHITE_CHECK_MARK} Eval Success`);
      // embed.addField("Input", input);
      if (typeof str == "string") {
        str = `"${str}"`;
      }

      // if (str instanceof Promise) str = await str;
      if (str instanceof Object) {
        str = JSON.stringify(str, null, 2);
        lang = "json";
      }
      const output = `\`\`\`${lang}\n${hasAttachment}${str}\`\`\``;
      embed.setDescription(
        `Output - ${capitalizeWords(typeof str)}\n` + output
      );
      await message.reply(embed);
    } catch (e) {
      str = e;

      const embed = new MessageEmbed();
      embed.setColor(globals.Color.embed);
      embed.setTitle(`${Emojis.NO_ENTRY} Eval Failed`);
      // embed.addField("Input", input.slice(0, 500));
      const output = `\`\`\`ts\n${hasAttachment}${str}\`\`\``;
      embed.setDescription(
        `Output - ${capitalizeWords(typeof str)}\n` + output
      );
      await message.reply(embed);
    }
  },
} as ICommand;
