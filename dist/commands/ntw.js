"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const capitalizeWords_1 = require("../functions/capitalizeWords");
const numToWords_1 = require("../functions/numToWords");
module.exports = {
    name: "ntw",
    aliases: ["numbersToWords"],
    restrictions: {},
    usesArgs: true,
    usage: "<num: string | number>",
    async run(message, args) {
        const words = numToWords_1.numToWords(args.join(" "));
        if (!words)
            return await message.channel.send("That's not a number!");
        if (words.includes("undefined"))
            return await message.channel.send("That's too big of a number!");
        await message.channel.send(`\`${args.join(" ")}\` => \`\`\`\n${capitalizeWords_1.capitalizeWords(words)}\`\`\``);
    },
};
