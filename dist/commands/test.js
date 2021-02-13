"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const getUser_1 = require("../functions/getUser");
module.exports = {
    name: "test",
    description: "TESTING",
    restrictions: {
        ownerOnly: true,
    },
    async run(message, args) {
        const user = await getUser_1.getUser(message, args, true);
        const guilds = __1.client.guilds.cache.filter((guild) => !!guild.member(message.author) && !!guild.member(user ?? message.author));
        await message.channel.send(`You share **${guilds.size}** server${guilds.size > 1 ? "s" : ""} with ${user}!\n${guilds
            .array()
            .map((e) => `\`${e.name.padEnd(40)}\`**[**||\`${e.id}\`||**]**`)
            .join("\n")}`);
    },
};
