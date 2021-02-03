"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numToWords_1 = require("../functions/numToWords");
module.exports = {
    name: "ntw",
    aliases: ["numbersToWords"],
    restrictions: {
        permissions: ["MANAGE_MESSAGES", "ADD_REACTIONS"],
    },
    async run(message, args) {
        const words = numToWords_1.numToWords(args.join(" "));
        await message.channel.send(`\`${args.join(" ")}\` => \`\`\`\n${words}\`\`\``);
    },
};
