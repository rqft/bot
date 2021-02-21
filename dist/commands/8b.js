"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const random_1 = require("../functions/random");
const globals_1 = require("../globals");
const _8ball_1 = require("../maps/8ball");
module.exports = {
    name: "8b",
    description: "eight ball",
    usage: "<q: text>",
    aliases: ["eightball", "8ball"],
    async run(message, args) {
        const query = args.join(" ");
        const response = random_1.random(_8ball_1.responses);
        await message.reply(new discord_js_1.MessageEmbed({
            description: `**You Asked**: ${query}
**Response**
┗— ${response}`,
            color: globals_1.Color.embed,
        }));
    },
};
