"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const getPresence_1 = require("../functions/getPresence");
const getUser_1 = require("../functions/getUser");
const globals_1 = require("../globals");
module.exports = {
    name: "presence",
    aliases: ["pres"],
    description: "get user presence",
    usage: "[user: User]",
    async run(message, args) {
        const target = (await getUser_1.getUser(message, args, true)) ?? message.author;
        const pres = getPresence_1.getPresence(target, 8888);
        message.channel.send(new discord_js_1.MessageEmbed({
            description: pres,
            title: `Presence of ${target.tag}`,
            color: globals_1.Color.embed,
        }));
    },
};
