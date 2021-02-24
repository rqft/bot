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
        const channels = {
            text: guild.channels.cache.filter((e) => e.type == "text").size,
            category: guild.channels.cache.filter((e) => e.type == "category").size,
            store: guild.channels.cache.filter((e) => e.type == "store").size,
            voice: guild.channels.cache.filter((e) => e.type == "voice").size,
            news: guild.channels.cache.filter((e) => e.type == "news").size,
        };
        const counts = [
            {
                text: `${"\uD83D\uDEE1\uFE0F"} **Roles**: ${(await guild.roles.fetch()).size}`,
                enabled: (await guild.roles.fetch()).filter((e) => !e.managed && guild.roles.everyone.id !== e.id).size > 0,
            },
            {
                text: `${"\uD83D\uDD28"} **Bans**: ${(await guild.fetchBans()).size}`,
                enabled: (await guild.fetchBans()).size > 0,
            },
            {
                text: `${"\uD83D\uDE03"} **Emojis**: ${(await guild.emojis.fetch()).size}`,
                enabled: (await guild.emojis.fetch()).size > 0,
            },
            {
                text: `${"\uD83D\uDCD1"} **Integrations**: ${(await guild.fetchIntegrations()).size}`,
                enabled: (await guild.fetchIntegrations()).size > 0,
            },
            {
                text: `${"\uD83D\uDCD6"} **Channels**: ${guild.channels.cache.size}
${"<:IconChannel_Text:798624246905569323>"}: ${channels.text} | ${"<:IconChannel_Category:798624247122493450>"}: ${channels.category} | ${"<:IconChannel_Voice:798624234732781580>"}: ${channels.voice} | ${"<:IconChannel_News:798624238793261109>"}: ${channels.news}`,
                enabled: guild.channels.cache.size > 1,
            },
        ];
        const enabled = counts
            .filter((e) => e.enabled == true)
            .map((e) => e.text)
            .join("\n");
        emb.addField("❯ Server Info", `${"\u2699\uFE0F"} **ID**: \`${guild.id}\`
${"<:IconGui_OwnerCrown:799657143719952415>"} **Owner**: ${guild.owner}
${"<:IconChannel_Voice:798624234732781580>"} **Voice Region**: ${getGuildVoiceRegion_1.getGuildVoiceRegion(guild)}
${"\uD83D\uDCC6"} **Created**: ${getLongAgo_1.simpleGetLongAgo(guild.createdTimestamp)} ago ${formatTimestamp_1.formatTimestamp(guild.createdAt)}`);
        emb.addField("❯ Counts", enabled);
        emb.addField(`❯ (${(await guild.fetchInvites()).size}) Invites`, (await guild.fetchInvites()).size
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
        if (guild.vanityURLCode) {
            emb.addField("❯ Vanity URL", `**Code**: ${guild.vanityURLCode}
**Uses**: ${guild.vanityURLUses}`);
        }
        emb.addField("❯ Features", getGuildFeatures_1.getGuildFeatures(guild));
        emb.setColor(globals_1.Color.embed);
        if (guild.banner) {
            emb.setImage(guild.bannerURL({ format: "gif", size: 1024 }));
        }
        await message.reply(emb);
    },
};
