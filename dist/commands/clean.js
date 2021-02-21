"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getChannel_1 = require("../functions/getChannel");
module.exports = {
    name: "clean",
    restrictions: {
        permissions: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
        guildOnly: true,
    },
    usage: "<channel: TextChannel> [count: number] [user: User]",
    description: "delete messages quickly",
    async run(message, args) {
        const amount = parseInt(args[1] ?? "3");
        const channel = getChannel_1.getChannel(message, args, false, 0);
        await channel.bulkDelete(amount, true);
        const res = await message.reply(`Deleted ${amount} messages from ${channel}`);
        const c = await channel.send(`${message.author} Deleted ${amount} messages in this channel`);
        setTimeout(() => {
            res.delete();
            c.delete();
        }, 1000);
    },
};
