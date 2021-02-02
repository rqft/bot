"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
const formatTimestamp_1 = require("../functions/formatTimestamp");
const getGuildFeatures_1 = require("../functions/getGuildFeatures");
const getGuildVoiceRegion_1 = require("../functions/getGuildVoiceRegion");
const getLongAgo_1 = require("../functions/getLongAgo");
const globals_1 = require("../globals");
module.exports = {
    name: "server",
    aliases: ["s"],
    usage: "[server: Guild | Snowflake]",
    async run(message, args) {
        if (!args[0] && !message.guild)
            return await message.channel.send("You need to provide a server!");
        const s = args[0] ? args[0].replace(/\D/g, "") : message.guild.id;
        var guild = null;
        try {
            guild = await __1.client.guilds.fetch(s);
        }
        catch {
            return await message.channel.send("Unknown server");
        }
        if (!guild)
            return;
        const emb = new discord_js_1.MessageEmbed();
        emb.setAuthor(guild.name, guild.iconURL({ dynamic: true }));
        emb.setThumbnail(guild.iconURL({ dynamic: true }));
        emb.addField("❯ Server Info", `:gear: **ID**: \`${guild.id}\`
<:IconGui_OwnerCrown:799657143719952415> **Owner**: ${guild.owner}
<:IconChannel_Voice:798624234732781580> **Voice Region**: ${getGuildVoiceRegion_1.getGuildVoiceRegion(guild)}
:calendar_spiral: **Created**: ${getLongAgo_1.simpleGetLongAgo(guild.createdTimestamp)} ago ${formatTimestamp_1.formatTimestamp(guild.createdAt)}`);
        emb.addField("❯ Server Info", getGuildFeatures_1.getGuildFeatures(guild));
        emb.setColor(globals_1.embedColor);
        await message.channel.send(emb);
    },
};
