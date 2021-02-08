import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
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

    var url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${language}|${targetLanguage}`;
    console.log(url);
    const req = await fetch(encodeURIComponent(url));
    const data = await req.json();
    if (
      data.responseData.translatedText.includes("IS AN INVALID TARGET LANGUAGE")
    ) {
      return await message.channel.send(
        "You must enter a valid language code. e.g `en`, `es`, `etc.`"
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
    const flag = `:flag_${language.replace("en", "us")}:`;
    const targetFlag = `:flag_${targetLanguage.replace("en", "us")}:`;
    const emb = new MessageEmbed();
    emb.setColor(Color.embed);
    emb.addField("Language", `${flag} - (\`${language.toUpperCase()}\`)`);
    emb.addField(
      "Target",
      `${targetFlag} - (\`${targetLanguage.toUpperCase()}\`)`
    );
    emb.addField(
      "Text",
      `\`\`\`
${data.responseData.translatedText}
\`\`\``
    );
    message.channel.send(emb);
  },
} as ICommand;
