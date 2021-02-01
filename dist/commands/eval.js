"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
const config_1 = require("../config");
const globals_1 = require("../globals");
module.exports = {
    on: "eval",
    description: "Run code",
    usage: "<code>",
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
            client;
            const config = config_1.config;
            config;
            str = eval(code);
            const embed = new discord_js_1.MessageEmbed();
            embed.setColor(globals_1.embedColor);
            embed.setTitle("✅ Eval Success");
            embed.addField("Input", input);
            if (typeof str == "object") {
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
            embed.setColor(globals_1.embedColor);
            embed.setTitle("⛔ Eval Failed");
            embed.addField("Input", input);
            const output = `\`\`\`ts\n${str}\`\`\``;
            embed.addField("Output", output);
            await message.channel.send(embed);
        }
    },
};
