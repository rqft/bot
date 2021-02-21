"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = require("../config");
module.exports = {
    name: "screenshot",
    aliases: ["ss"],
    description: "takes a screenshot of a website",
    usesArgs: true,
    usage: "<url: URL>",
    async run(message, args) {
        message.suppressEmbeds(true);
        const ret = await message.reply("<a:IconGui_Typing:798624244351107092>");
        const url = args[0];
        const waitTime = parseInt(args[1] ?? "500");
        const baseURL = "https://fapi.wrmsr.io/screenshot";
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config_1.config.global.keys.fAPI}`,
        };
        const argument = {
            text: url,
            allowNSFW: message.guild
                ? message.channel.nsfw
                : false,
            wait: waitTime,
        };
        const body = {
            images: [url],
            args: argument,
        };
        const fAPI = await node_fetch_1.default(baseURL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });
        await ret.delete();
        if (!fAPI.ok)
            return await message.reply(`There was an error (code ${fAPI.status}). \`\`\`diff\n${fAPI.statusText
                .split("\n")
                .map((e) => `- ${e}`)}\n\`\`\``);
        await message.reply(`here is your screenshot`, {
            files: [
                {
                    name: "fAPI.png",
                    attachment: await fAPI.buffer(),
                },
            ],
        });
    },
};
