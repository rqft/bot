"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: "owo",
    description: "OWO",
    aliases: ["uwu", "owoify", "uwuify"],
    usage: "[text]",
    async run(message, args) {
        const text = args.length
            ? args.join(" ")
            : message.channel.lastMessage?.content;
        message.channel.send(new discord_js_1.MessageEmbed({
            description: text.replace(/[lr]/g, "w").replace(/[LR]/g, "W"),
        }));
    },
};
