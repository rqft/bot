"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "clean",
    restrictions: {
        ownerOnly: true,
        guildOnly: true,
    },
    usage: "[count: number]",
    async run(message, args) {
        const amount = parseInt(args[0] ?? "3");
        const a = await message.channel.bulkDelete(amount, true);
        await message.channel.send(`Deleted ${a.size} messages from ${message.channel}`);
    },
};
