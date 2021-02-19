"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("../config");
const api_1 = require("../functions/api");
const globals_1 = require("../globals");
module.exports = {
    name: "search",
    usesArgs: true,
    usage: "<query: text>",
    description: "search for stuff",
    async run(message, args) {
        const res = await api_1.api(`http://api.wolframalpha.com/v1/result?appid=${config_1.config.global.keys.wolframAlpha}&i=${encodeURIComponent(args.join(" "))}`, "text");
        const emb = new discord_js_1.MessageEmbed();
        emb.addField("Query", args.join(" "));
        emb.addField("Result", res);
        emb.setFooter(`(Done in ${Date.now() - message.createdTimestamp}ms)`);
        emb.setColor(globals_1.Color.embed);
        await message.channel.send(emb);
    },
};
