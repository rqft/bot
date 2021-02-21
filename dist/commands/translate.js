"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const globals_1 = require("../globals");
const lang = __importStar(require("../maps/languageCodes.json"));
const langCodes = lang;
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
            return await message.reply(`:warning: Argument Error (missing argument)
\`\`\`
${this.usage}\`\`\``);
        if (text.length > 500)
            return await message.reply("The text is too long!");
        var url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${language}|${targetLanguage}`;
        console.log(url);
        const req = await node_fetch_1.default(url);
        const data = (await req.json());
        if (data.responseData.translatedText.includes("IS AN INVALID TARGET LANGUAGE")) {
            return await message.reply(new discord_js_1.MessageEmbed({
                description: "You must enter a valid language code. e.g `en`, `es`, `etc.`\nYou can view them all [here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)",
            }));
        }
        if (data.responseData.translatedText.includes("PLEASE SELECT TWO DISTINCT LANGUAGES")) {
            return await message.reply("You must enter two distinct languages.");
        }
        const flag = `:flag_${language.replace(/en/g, "us").replace(/ja/g, "jp")}:`;
        const languageNames = {
            from: langCodes[language],
            to: langCodes[targetLanguage],
        };
        const targetFlag = `:flag_${targetLanguage
            .replace(/en/g, "us")
            .replace(/ja/g, "jp")}:`;
        const emb = new discord_js_1.MessageEmbed();
        emb.setColor(globals_1.Color.embed);
        emb.addField("Input", `${flag} - ${languageNames.from?.name} (\`${language.toUpperCase()}\`)\n\`\`\`\n${text}\`\`\``);
        function parseHtmlEntities(str) {
            return str.replace(/&#([0-9]{1,3});/gi, function (_match, numStr) {
                var num = parseInt(numStr, 10);
                return String.fromCharCode(num);
            });
        }
        emb.addField("Translated Text", `${targetFlag} - ${languageNames.to?.name} (\`${targetLanguage.toUpperCase()}\`)\n\`\`\`\n${parseHtmlEntities(data.responseData.translatedText)}\`\`\``);
        emb.setFooter(`${language.toUpperCase()} => ${targetLanguage.toUpperCase()} | ${data.responseData.match * 100}% match rate`);
        message.reply(emb);
    },
};
