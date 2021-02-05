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
const getUserPermissions_1 = require("../functions/getUserPermissions");
const globals_1 = require("../globals");
module.exports = {
    name: "user",
    aliases: ["u"],
    usage: "[user: User | Snowflake]",
    async run(message, args) {
        var res = args.join(" ")?.normalize();
        if (res?.toLowerCase() == "discord")
            res = "643945264868098049";
        if (res?.toLowerCase() == "me")
            res = message.author.id;
        if (res?.toLowerCase() == "bot" || res?.toLowerCase() == "system")
            res = __1.client.user?.id;
        if (res?.toLowerCase() == "random") {
            if (!message.guild) {
                return await message.channel.send("You need to be in a server to run this!");
            }
            res = message.guild.members.cache.random().id;
        }
        if (res?.toLowerCase() == "owner") {
            if (!message.guild) {
                return await message.channel.send("You need to be in a server to run this!");
            }
            res = message.guild.ownerID;
        }
        var unresolvedID = args.join(" ").length ? res : message.author.id;
        if (res.match(/<@!?(\d+)>/g)?.length !== 0)
            unresolvedID = res.replace(/[<@!>]/g, "");
        var user = null;
        try {
            user = __1.client.users.cache.find((e) => e.username.toLowerCase().normalize() == unresolvedID ||
                e.tag.toLowerCase().normalize() == unresolvedID ||
                e.id == unresolvedID ||
                `${e}` == unresolvedID ||
                message.guild?.members.cache.get(e.id)?.nickname == unresolvedID);
        }
        catch (error) { }
        if (!user) {
            return await message.channel.send("Unknown User");
        }
        message.guild?.members.cache.array;
        const emb = new discord_js_1.MessageEmbed();
        emb.setAuthor(user.tag, user.avatarURL({
            dynamic: true,
        }) ?? user.defaultAvatarURL);
        emb.setThumbnail(user.avatarURL({
            dynamic: true,
        }) ?? user.defaultAvatarURL);
        emb.addField(`❯ User Info`, `:gear: **󠇰ID**: \`${user.id}\`
:link: **Profile**: ${user}
:calendar_spiral: **Created**: ${getLongAgo_1.simpleGetLongAgo(user.createdTimestamp)} ago ${formatTimestamp_1.formatTimestamp(user.createdAt)}`);
        var mem = message.guild?.member(user) ?? false;
        if (mem) {
            emb.addField("❯ Presence", getPresence_1.getPresence(user, 30));
            const roles = mem.roles.cache.filter((e) => !e.deleted && e.guild.id !== e.id);
            emb.addField("❯ Member Information", `:inbox_tray: **Joined:** ${getLongAgo_1.getLongAgo(mem.joinedTimestamp, 2)} ago ${formatTimestamp_1.formatTimestamp(mem.joinedAt)}
${roles.size !== 0
                ? `:shield: **Roles** (${roles.size}): ${roles.array().join(", ")}`
                : ""}`);
            emb.addField("❯ Permissions", `:gear: **Permission List**: ${getUserPermissions_1.getUserPermissions(mem)}
        :cyclone: **Bot Level**: __\`${getBotLevel_1.getBotLevel(mem)}\`__`);
        }
        emb.addField("❯ Profile Badges", getProfileBadges_1.getProfileBadges(user));
        emb.addField("❯ Bot Badges", getBotBadges_1.getBotBadges(user));
        emb.setColor(globals_1.Color.embed);
        await message.channel.send(emb);
    },
};
