"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatTimestamp_1 = require("../functions/formatTimestamp");
const getLongAgo_1 = require("../functions/getLongAgo");
module.exports = {
    name: "remind",
    aliases: ["r"],
    usage: "<time: string> [comment: text]",
    usesArgs: true,
    async run(message, args) {
        const time = args[0] ?? "5m";
        const comment = args.slice(1).join(" ");
        const timeSuffix = {
            i: 1,
            s: 1000,
            m: 60 * 1000,
            h: 60 * 60 * 1000,
            d: 24 * 60 * 60 * 1000,
            w: 7 * 24 * 60 * 60 * 1000,
        };
        const TIME_REGEX = /(\d+)([ismhdw])/g;
        const ms = Array.from(time.matchAll(TIME_REGEX)).reduce((p, [, num, suffix]) => p + parseInt(num, 10) * timeSuffix[suffix], 0);
        if (ms < 500) {
            return await message.channel.send("Must be higher than 500 milliseconds");
        }
        await message.channel.send(`:white_check_mark: I will remind you in ${getLongAgo_1.simpleGetLongAgo(Date.now() - ms)} ${formatTimestamp_1.formatTimestamp(new Date(Date.now() + ms))}`);
        setTimeout(async () => {
            await message.channel.send(`Hey ${message.author}! You told me at \`${message.createdAt.toLocaleString()}\` (${getLongAgo_1.simpleGetLongAgo(message.createdTimestamp)} ago) to remind you about${comment ? `: \`${comment}\`` : " something!"}`);
        }, ms);
    },
};
