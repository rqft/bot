"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getChannel_1 = require("../functions/getChannel");
const getUser_1 = require("../functions/getUser");
module.exports = {
    name: "clean",
    restrictions: {
        permissions: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
        guildOnly: true,
    },
    usage: "<channel: TextChannel> [count: number] [user: User]",
    async run(message, args) {
        const amount = parseInt(args[1] ?? "3");
        const user = await getUser_1.getUser(message, args, false, 2);
        const channel = getChannel_1.getChannel(message, args, false, 0);
        await channel.bulkDelete((await channel.messages.fetch({ before: message.id, limit: amount })).filter((e) => (user ? e.author == user : true)), true);
        const res = await message.channel.send(`Deleted ${amount} messages from ${channel}`);
        const c = await channel.send(`${message.author} Deleted ${amount} messages in this channel ${user ? user : ""}`);
        setTimeout(() => {
            res.delete();
            c.delete();
        }, 1000);
    },
};
