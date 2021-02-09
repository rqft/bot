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
const checkArrayContainsAll_1 = require("../functions/checkArrayContainsAll");
const fetchCommand_1 = require("../functions/fetchCommand");
const globals = __importStar(require("../globals"));
module.exports = {
    name: "eval",
    description: "Run code",
    usage: "<code: text>",
    restrictions: {
        ownerOnly: true,
    },
    async run(message, args) {
        var lang = "ts";
        const code = args.join(" ").replace(/\`{3}\n?(.+)?/g, "");
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
            embed.setTitle("✅ Eval Success");
            embed.addField("Input", input);
            if (str instanceof Object) {
                str = JSON.stringify(str, null, 2);
                lang = "json";
            }
            const output = `\`\`\`${lang}\n${str}\`\`\``;
            embed.addField("Output", output);
            await message.channel.send(embed);
        }
        catch (e) {
            str = e;
            const embed = new discord_js_1.MessageEmbed();
            embed.setColor(globals.Color.embed);
            embed.setTitle("⛔ Eval Failed");
            embed.addField("Input", input);
            const output = `\`\`\`ts\n${str}\`\`\``;
            embed.addField("Output", output);
            await message.channel.send(embed);
        }
    },
};
