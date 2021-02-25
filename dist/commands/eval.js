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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const __1 = require("..");
const config_1 = require("../config");
const api_1 = require("../functions/api");
const capitalizeWords_1 = require("../functions/capitalizeWords");
const checkArrayContainsAll_1 = require("../functions/checkArrayContainsAll");
const fetchCommand_1 = require("../functions/fetchCommand");
const globals = __importStar(require("../globals"));
module.exports = {
    name: "eval",
    description: "Run code",
    usage: "<code: text | Attachment>",
    restrictions: {
        ownerOnly: true,
    },
    async run(message, args) {
        var lang = "ts";
        const hasAttachment = message.attachments.array()[0]
            ? `// Has Attachment\n`
            : "";
        const code = args.length
            ? args.join(" ").replace(/\`{3}\n?(.+)?/g, "")
            : await api_1.api(message.attachments.array()[0]
                ? message.attachments.array()[0].url
                : "https://raw.githubusercontent.com/arcy-at/arcy-at/main/bot-default-eval-file.js", "text");
        const input = `\`\`\`ts\n${code}\`\`\``;
        var str = null;
        try {
            const client = __1.client;
            const config = config_1.config;
            const fetchCommand = fetchCommand_1.fetchCommand;
            const cf = checkArrayContainsAll_1.arrayContainsAll;
            const discord = discord_js_1.default;
            const char = globals.Chars;
            client;
            config;
            fetchCommand;
            cf;
            discord;
            char;
            str = eval(code);
            const embed = new discord_js_1.MessageEmbed();
            embed.setColor(globals.Color.embed);
            embed.setTitle(`${"\u2705"} Eval Success`);
            embed.addField("Input", input);
            if (typeof str == "string") {
                str = `"${str}"`;
            }
            if (str instanceof Object) {
                str = JSON.stringify(str, null, 2);
                lang = "json";
            }
            const output = `\`\`\`${lang}\n${hasAttachment}${str}\`\`\``;
            embed.addField(`Output - ${capitalizeWords_1.capitalizeWords(typeof str)}`, output);
            await message.reply(embed);
        }
        catch (e) {
            str = e;
            const embed = new discord_js_1.MessageEmbed();
            embed.setColor(globals.Color.embed);
            embed.setTitle(`${"\u26D4"} Eval Failed`);
            embed.addField("Input", input.slice(0, 500));
            const output = `\`\`\`ts\n${hasAttachment}${str}\`\`\``;
            embed.addField(`Output - ${capitalizeWords_1.capitalizeWords(typeof str)}`, output);
            await message.reply(embed);
        }
    },
};
