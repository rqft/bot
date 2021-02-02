"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "test",
    restrictions: {
        serverOwnerOnly: true,
    },
    usesArgs: true,
    usage: "<a: string>",
    async run(message) {
        await message.channel.send(":white_check_mark:");
    },
};
