"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatTimestamp_1 = require("../functions/formatTimestamp");
const getLongAgo_1 = require("../functions/getLongAgo");
const parseTimeString_1 = require("../functions/parseTimeString");
module.exports = {
    name: "remind",
    aliases: ["r"],
    usage: "<time: string> [comment: text]",
    usesArgs: true,
    async run(message, args) {
        const time = args[0] ?? "5m";
        const comment = args.slice(1).join(" ");
        const ms = parseTimeString_1.parseTimeString(time);
        await message.channel.send(`:white_check_mark: I will remind you in ${getLongAgo_1.simpleGetLongAgo(Date.now() - ms)} ${formatTimestamp_1.formatTimestamp(new Date(Date.now() + ms))}`);
        const exec = Date.now();
        setTimeout(async () => await message.channel.send(`Hey ${message.author}! You told me at \`${message.createdAt.toLocaleString()}\` (${getLongAgo_1.simpleGetLongAgo(exec)} ago) to remind you about${comment ? `: \`${comment}\`` : " something!"}`), ms);
    },
};
