"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
const formatTimestamp_1 = require("../functions/formatTimestamp");
const getBotBadges_1 = require("../functions/getBotBadges");
const getBotLevel_1 = require("../functions/getBotLevel");
const getLongAgo_1 = require("../functions/getLongAgo");
const getPresence_1 = require("../functions/getPresence");
const getProfileBadges_1 = require("../functions/getProfileBadges");
const getUser_1 = require("../functions/getUser");
const getUserPermissions_1 = require("../functions/getUserPermissions");
const globals_1 = require("../globals");
module.exports = {
    name: "user",
    aliases: ["u"],
    usage: "[user: User | Snowflake]",
    description: "get user info",
    async run(message, args) {
        const user = await getUser_1.getUser(message, args, true);
        if (!user) {
            return await message.reply(`${"\u26A0\uFE0F"} Unknown User`);
        }
        const emb = new discord_js_1.MessageEmbed();
        emb.setAuthor(user.tag, user.avatarURL({
            dynamic: true,
        }) ?? user.defaultAvatarURL);
        emb.setThumbnail(user.avatarURL({
            dynamic: true,
            size: 128,
        }) ?? user.defaultAvatarURL);
        emb.addField(`❯ User Info`, `${"\u2699\uFE0F"} **󠇰ID**: \`${user.id}\`
${"\uD83D\uDD17"} **Profile**: ${user}
${"\uD83D\uDDD3\uFE0F"} **Created**: ${getLongAgo_1.simpleGetLongAgo(user.createdTimestamp)} ago ${formatTimestamp_1.formatTimestamp(user.createdAt)}`);
        var mem = message.guild?.members.cache.get(user.id) ?? false;
        if (user.presence.guild)
            emb.addField("❯ Presence", getPresence_1.getPresence(user));
        if (mem) {
            const roles = mem.roles.cache
                .filter((e) => !e.deleted && e.guild.id !== e.id)
                .array()
                .sort((a, b) => a.position - b.position);
            emb.addField("❯ Member Information", `${"\uD83D\uDCE5"} **Joined:** ${getLongAgo_1.getLongAgo(mem.joinedTimestamp, 2)} ago ${formatTimestamp_1.formatTimestamp(mem.joinedAt)}
${roles.length !== 0
                ? `${"\uD83D\uDEE1\uFE0F"} **Roles** (${roles.length}): ${roles
                    .slice(0, 10)
                    .join(", ")}${roles.length > 10 ? `\nand ${roles.length - 10} more...` : ""}`
                : ""}`);
            emb.addField("❯ Permissions", `${"\u2699\uFE0F"} **Permission List**: ${getUserPermissions_1.getUserPermissions(mem)}
${"\uD83C\uDF00"} **Bot Level**: __\`${getBotLevel_1.getBotLevel(mem)}\`__`);
            if ((await mem.guild.fetchInvites())
                .array()
                .filter((e) => e.inviter == user).length)
                emb.addField("❯ Invites", (await mem.guild.fetchInvites())
                    .array()
                    .filter((e) => e.inviter == user).length
                    ? (await mem.guild.fetchInvites())
                        .array()
                        .filter((e) => e.inviter == user)
                        .slice(0, 5)
                        .map((e) => `${e.channel} [Invite](${e.url}) ${formatTimestamp_1.formatTimestamp(e.createdAt)}`)
                        .join("\n")
                    : "None.");
        }
        emb.addField("❯ Profile Badges", getProfileBadges_1.getProfileBadges(user).join("\n"));
        emb.addField("❯ Bot Badges", getBotBadges_1.getBotBadges(user));
        const seenOn = __1.client.guilds.cache
            .filter((e) => e.members.cache.has(user.id))
            .array();
        if (seenOn.length) {
            emb.addField(`❯ Seen on ${seenOn.length} servers`, `${seenOn
                .slice(0, 3)
                .map((e) => `*${e.name}* as \`${e.members.cache.get(user.id)?.displayName}\``)
                .join("\n")}${seenOn.length > 3 ? `\nand ${seenOn.length - 3} more...` : ""}`);
        }
        emb.setColor(globals_1.Color.embed);
        await message.reply(emb);
    },
};
