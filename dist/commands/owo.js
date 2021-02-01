"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    on: "fetchMessages",
    description: "OWO",
    aliases: ["uwu", "owoify", "uwuify"],
    usage: "[count: number]",
    async run(message) {
        const messages = await message.channel.messages.fetch({
            before: message.id,
            limit: 1,
        });
        await message.channel.send(".\n" +
            messages
                .array()
                .map((e) => `\`${e.author.tag}\` ${e.content}`)
                .join("\n"));
    },
};
