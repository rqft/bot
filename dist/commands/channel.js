"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
const capitalizeWords_1 = require("../functions/capitalizeWords");
const formatTimestamp_1 = require("../functions/formatTimestamp");
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
        var res = args.join(" ")?.normalize();
        if (!res)
            res = message.channel.id;
        if (res?.toLowerCase() == "here")
            res = message.channel.id;
        if (res?.toLowerCase() == "random") {
            if (!message.guild) {
                return await message.channel.send("You need to be in a server to run this!");
            }
            res = message.guild.channels.cache.random().id;
        }
        var unresolvedID = args.join(" ").length ? res : message.author.id;
        if (res.match(/<@!?(\d+)>/g)?.length !== 0)
            unresolvedID = res.replace(/[<@!>]/g, "");
        var channel = null;
        try {
            channel = message.guild?.channels.cache.find((e) => e.name.toLowerCase().normalize() == unresolvedID ||
                e.id == unresolvedID ||
                `${e}` == unresolvedID ||
                message.guild?.members.cache.get(e.id)?.nickname == unresolvedID);
        }
        catch (error) { }
        if (!channel) {
            return await message.channel.send("Unknown User");
        }
        const emb = new discord_js_1.MessageEmbed();
        emb.setAuthor(`${channel.name}`, __1.client.emojis.cache.get("798624246905569323").url);
        emb.addField("❯ Channel Info", `:gear: **ID**: \`${channel.id}\`
:link: **Channel**: ${channel}
:calendar_spiral: **Created**: ${getLongAgo_1.simpleGetLongAgo(channel.createdTimestamp)} ${formatTimestamp_1.formatTimestamp(channel.createdAt)}
:jigsaw: **Type**: ${capitalizeWords_1.capitalizeWords(channel.type)}`);
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
