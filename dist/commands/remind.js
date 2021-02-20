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
    description: "set up reminders",
    async run(message, args) {
        const time = args[0] ?? "5m";
        const comment = args.slice(1).join(" ");
        const ms = parseTimeString_1.parseTimeString(time);
        const query = {
            executedAt: new Date(),
            user: message.author,
            comment: comment,
            expiry: Date.now() + ms,
        };
        await message.channel.send(`${"\u2705"} I will remind you in ${getLongAgo_1.simpleGetLongAgo(Date.now() - ms)} ${formatTimestamp_1.formatTimestamp(query.expiry)}`);
        setTimeout(async () => await message.channel.send(`Hey ${query.user}! You told me at \`${query.executedAt.toLocaleString()}\` (${getLongAgo_1.simpleGetLongAgo(+query.executedAt)} ago) to remind you about${query.comment
            ? `: ${query.comment.length > 50
                ? `\`\`\`\n${query.comment}\`\`\``
                : `\`${query.comment}\``} `
            : " something!"}`), query.expiry - Date.now());
    },
};
