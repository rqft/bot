"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "test",
    restrictions: {
        permissions: ["ADD_REACTIONS"],
    },
    async run(message) {
        await message.channel.send(":white_check_mark:");
    },
};
