import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { IMyMemoryResponse } from "../interfaces/IMyMemory";
import * as lang from "../maps/languageCodes.json";
const langCodes: {
  [any: string]: {
    name: string;
    nativeName: string;
  };
} = lang;
module.exports = {
  name: "translate",
  usesArgs: true,
  aliases: ["changelanguage"],
  description: "Translations!",
  restrictions: {
    // ownerOnly: true,
  },
  usage: "<language: string> <targetLanguage: string> <text: text>",
  async run(message, args) {
    args = args.map((e) => e.toLowerCase());
    const language = args[0];
    const targetLanguage = args[1];
    const text = args.slice(2).join(" ");
    if (!text || !targetLanguage || !language)
      return await message.channel.send(
        `:warning: Argument Error (missing argument)
\`\`\`
${this.usage}\`\`\``
      );
    if (text.length > 500)
      return await message.channel.send("The text is too long!");
    var url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${language}|${targetLanguage}`;
    console.log(url);
    const req = await fetch(url);
    const data = (await req.json()) as IMyMemoryResponse;
    if (
      data.responseData.translatedText.includes("IS AN INVALID TARGET LANGUAGE")
    ) {
      return await message.channel.send(
        new MessageEmbed({
          description:
            "You must enter a valid language code. e.g `en`, `es`, `etc.`\nYou can view them all [here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)",
        })
      );
    }

    if (
      data.responseData.translatedText.includes(
        "PLEASE SELECT TWO DISTINCT LANGUAGES"
      )
    ) {
      return await message.channel.send(
        "You must enter two distinct languages."
      );
    }
    const flag = `:flag_${language.replace(/en/g, "us").replace(/ja/g, "jp")}:`;
    const languageNames = {
      from: langCodes[language],
      to: langCodes[targetLanguage],
    };
    const targetFlag = `:flag_${targetLanguage
      .replace(/en/g, "us")
      .replace(/ja/g, "jp")}:`;
    const emb = new MessageEmbed();
    emb.setColor(Color.embed);
    emb.addField(
      "Input",
      `${flag} - ${
        languageNames.from?.name
      } (\`${language.toUpperCase()}\`)\n\`\`\`\n${text}\`\`\``
    );
    function parseHtmlEntities(str: string) {
      return str.replace(/&#([0-9]{1,3});/gi, function (_match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
      });
    }
    emb.addField(
      "Translated Text",
      `${targetFlag} - ${
        languageNames.to?.name
      } (\`${targetLanguage.toUpperCase()}\`)\n\`\`\`\n${parseHtmlEntities(
        data.responseData.translatedText
      )}\`\`\``
    );
    emb.setFooter(
      `${language.toUpperCase()} => ${targetLanguage.toUpperCase()} | ${
        data.responseData.match * 100
      }% match rate`
    );
    message.channel.send(emb);
  },
} as ICommand;
