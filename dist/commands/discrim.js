"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
module.exports = {
    name: "discrim",
    description: "Find users with a certain discriminator (#XXXX, defaults to yours)",
    usage: "[user: User]",
    async run(message, args) {
        const discrim = args[0]?.replace(/\D/g, "") ?? message.author.discriminator;
        const users = __1.client.users.cache
            .filter((e) => e.discriminator == discrim)
            .array()
            .map((e) => `**${e.username}**#${e.discriminator}`);
        await message.channel.send(new discord_js_1.MessageEmbed({
            title: `Users with discrim ${discrim}`,
            description: `${users.length} Users Found\n\n` + users.length
                ? users.join("\n")
                : "",
            footer: { text: `${__1.client.users.cache.size} users checked total` },
        }));
    },
};
