"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const formatTimestamp_1 = require("../functions/formatTimestamp");
const getGuild_1 = require("../functions/getGuild");
const getGuildFeatures_1 = require("../functions/getGuildFeatures");
const getGuildVoiceRegion_1 = require("../functions/getGuildVoiceRegion");
const getLongAgo_1 = require("../functions/getLongAgo");
const globals_1 = require("../globals");
module.exports = {
    name: "server",
    aliases: ["s"],
    usage: "[server: Guild | Snowflake]",
    description: "get server info",
    async run(message, args) {
        const guild = await getGuild_1.getGuild(message, args, true);
        if (!guild)
            return await message.reply("Unknown Server");
        const emb = new discord_js_1.MessageEmbed();
        emb.setAuthor(guild.name, guild.iconURL({ dynamic: true }));
        emb.setThumbnail(guild.iconURL({ dynamic: true }));
        emb.addField("❯ Server Info", `${"\u2699\uFE0F"} **ID**: \`${guild.id}\`
${"<:IconGui_OwnerCrown:799657143719952415>"} **Owner**: ${guild.owner}
${"<:IconChannel_Voice:798624234732781580>"} **Voice Region**: ${getGuildVoiceRegion_1.getGuildVoiceRegion(guild)}
${"\uD83D\uDCC6"} **Created**: ${getLongAgo_1.simpleGetLongAgo(guild.createdTimestamp)} ago ${formatTimestamp_1.formatTimestamp(guild.createdAt)}`);
        emb.addField("❯ Invites", (await guild.fetchInvites()).size
            ? (await guild.fetchInvites())
                .array()
                .slice(0, 5)
                .map((e) => `${e.channel} [Invite](${e.url}) by ${e.inviter} ${formatTimestamp_1.formatTimestamp(e.createdAt)}`)
                .join("\n")
            : "None.");
        if (guild.premiumSubscriptionCount) {
            const boosters = guild.members.cache
                .filter((e) => !!e.premiumSince)
                .array();
            emb.addField("❯ Server Boosts", `${"<:IconGui_OwnerCrown:799657143719952415>"} **Tier**: ${guild.premiumTier}
${"<:IconBadge_Nitro:798624232472051792>"} **Boosts**: ${guild.premiumSubscriptionCount}
${"<:IconGui_Members:798624241868079104>"} **Boosters (${boosters.length})**:
${boosters
                .map((e) => `${e} for ${getLongAgo_1.simpleGetLongAgo(e.premiumSinceTimestamp)}`)
                .slice(0, 10)
                .join("\n")} ${boosters.length > 10 ? `and ${boosters.length - 10} more...` : ""}`);
        }
        emb.addField("❯ Features", getGuildFeatures_1.getGuildFeatures(guild));
        emb.setColor(globals_1.Color.embed);
        await message.reply(emb);
    },
};
