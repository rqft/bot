"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
const capitalizeWords_1 = require("../functions/capitalizeWords");
const formatTimestamp_1 = require("../functions/formatTimestamp");
const getChannel_1 = require("../functions/getChannel");
const getLongAgo_1 = require("../functions/getLongAgo");
const globals_1 = require("../globals");
module.exports = {
    name: "channel",
    aliases: ["ch"],
    usage: "[channel: Channel | Snowflake]",
    restrictions: {
        guildOnly: true,
    },
    async run(message, args) {
        const channel = await getChannel_1.getChannel(message, args);
        if (!channel)
            return await message.channel.send("Unknown Channel!");
        const emb = new discord_js_1.MessageEmbed();
        emb.setAuthor(`${channel.name}`, __1.client.emojis.cache.get("798624246905569323").url);
        emb.addField("❯ Channel Info", `${"\u2699\uFE0F"} **ID**: \`${channel.id}\`
${"\uD83D\uDD17"} **Channel**: ${channel}
${"\uD83D\uDDD3\uFE0F"} **Created**: ${getLongAgo_1.simpleGetLongAgo(channel.createdTimestamp)} ${formatTimestamp_1.formatTimestamp(channel.createdAt)}
${"\uD83E\uDDE9"} **Type**: ${capitalizeWords_1.capitalizeWords(channel.type)}`);
        emb.addField("❯ Invites", (await channel.fetchInvites()).size
            ? (await channel.fetchInvites())
                .array()
                .slice(0, 5)
                .map((e) => `[Invite](${e.url}) by ${e.inviter} ${formatTimestamp_1.formatTimestamp(e.createdAt)}`)
                .join("\n")
            : "None.");
        emb.setColor(globals_1.Color.embed);
        await message.channel.send(emb);
    },
};
