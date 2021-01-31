"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
module.exports = {
    name: "about",
    usesArgs: false,
    description: "Info about the bot",
    async run(message) {
        message.channel.send(new discord_js_1.MessageEmbed({
            fields: [
                {
                    name: "About",
                    value: `Hi! This is a bot made by ${(await __1.client.fetchApplication()).owner} made with [DiscordJS](https://discord.js.org/#/) and a stupid idea.

You can invite the bot to your server [here](https://discord.com/api/oauth2/authorize?client_id=${(await __1.client.fetchApplication()).id}&permissions=8&scope=bot)`,
                },
            ],
        }));
    },
};
