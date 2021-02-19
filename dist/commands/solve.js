"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("../config");
const api_1 = require("../functions/api");
const globals_1 = require("../globals");
module.exports = {
    name: "solve",
    restrictions: {},
    description: "do math",
    usesArgs: true,
    usage: "<expression: MathString>",
    async run(message, args) {
        const query = `solve ${args.join(" ")}`;
        const url = `http://api.wolframalpha.com/v2/query?appid=${config_1.config.global.keys.wolframAlpha}&input=${encodeURIComponent(query)}&podstate=Step-by-step%20solution&output=json&scanner=Solve`;
        const result = await api_1.api(url, "json");
        if (!result.queryresult.success) {
            await message.channel.send(`:no_entry: Error (${result.queryresult.error.code}): ${result.queryresult.error.msg}`);
        }
        const emb = new discord_js_1.MessageEmbed();
        emb.setTitle(query);
        if (result.queryresult.pods) {
            emb.addField("Answer", result.queryresult.pods[0].subpods[0].plaintext);
            emb.addField("Steps", `\`\`\`` +
                result.queryresult.pods[0].subpods[1].plaintext
                    .replace(/\|/g, ">")
                    .replace("Answer: >", "Answer:") +
                `\`\`\``);
        }
        else {
            const ex = await api_1.api(`http://api.mathjs.org/v4/?expr=${encodeURIComponent(args.join(" "))}`, "text");
            emb.addField("Answer", `\`${ex}\``);
        }
        emb.setColor(globals_1.Color.embed);
        await message.channel.send(emb);
    },
};
