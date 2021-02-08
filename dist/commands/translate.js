"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const globals_1 = require("../globals");
module.exports = {
    name: "translate",
    usesArgs: true,
    aliases: ["changelanguage"],
    description: "Translations!",
    restrictions: {},
    usage: "<language: string> <targetLanguage: string> <text: text>",
    async run(message, args) {
        args = args.map((e) => e.toLowerCase());
        const language = args[0];
        const targetLanguage = args[1];
        const text = args.slice(2).join(" ");
        if (!text || !targetLanguage || !language)
            return await message.channel.send(`:warning: Argument Error (missing argument)
\`\`\`
${this.usage}\`\`\``);
        var url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${language}|${targetLanguage}`;
        console.log(url);
        const req = await node_fetch_1.default(url);
        const data = (await req.json());
        if (data.responseData.translatedText.includes("IS AN INVALID TARGET LANGUAGE")) {
            return await message.channel.send("You must enter a valid language code. e.g `en`, `es`, `etc.`");
        }
        if (data.responseData.translatedText.includes("PLEASE SELECT TWO DISTINCT LANGUAGES")) {
            return await message.channel.send("You must enter two distinct languages.");
        }
        const flag = `:flag_${language.replace("en", "us")}:`;
        const targetFlag = `:flag_${targetLanguage.replace("en", "us")}:`;
        const emb = new discord_js_1.MessageEmbed();
        emb.setColor(globals_1.Color.embed);
        emb.addField("Input", `${flag} - (\`${language.toUpperCase()}\`)\n\`\`\`\n${text}\`\`\``);
        emb.addField("Translated Text", `${targetFlag} - (\`${targetLanguage.toUpperCase()}\`)\n\`\`\`\n${data.responseData.translatedText}\`\`\``);
        emb.setFooter(`${language.toUpperCase()} => ${targetLanguage.toUpperCase()} | ${data.responseData.match * 100}% match rate`);
        message.channel.send(emb);
    },
};
