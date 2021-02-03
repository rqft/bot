"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
const config_1 = require("../config");
const formatTimestamp_1 = require("../functions/formatTimestamp");
const getLongAgo_1 = require("../functions/getLongAgo");
const globals_1 = require("../globals");
module.exports = {
    name: "about",
    usesArgs: false,
    description: "Info about the bot",
    async run(message) {
        message.channel.send(new discord_js_1.MessageEmbed({
            color: globals_1.Color.embed,
            fields: [
                {
                    name: "About",
                    value: `Hi! This is a bot made by ${(await __1.client.fetchApplication()).owner} made with [DiscordJS](https://discord.js.org/#/) and a stupid idea.

You can invite the bot to your server [here](https://discord.com/api/oauth2/authorize?client_id=${(await __1.client.fetchApplication()).id}&permissions=8&scope=bot)
My prefixes are: ${config_1.config.bot.prefixes.join(", ").replace(/\?/g, "")}
Join the [Bot Server](https://discord.gg/WhwnQYFQGU)`,
                },
                {
                    name: "Stats",
                    value: `**Current Ping**: ${__1.client.ws.ping}ms
Currently has **${__1.commands.size} commands**
On **${__1.client.guilds.cache.size}** Servers
Last deployed ${getLongAgo_1.simpleGetLongAgo(__1.client.readyTimestamp)} ago ${formatTimestamp_1.formatTimestamp(__1.client.readyAt)}`,
                },
            ],
        }));
    },
};
