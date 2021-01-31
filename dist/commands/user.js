"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
const formatTimestamp_1 = require("../functions/formatTimestamp");
const getBotLevel_1 = require("../functions/getBotLevel");
const getLongAgo_1 = require("../functions/getLongAgo");
const getPresence_1 = require("../functions/getPresence");
const getUserPermissions_1 = require("../functions/getUserPermissions");
const globals_1 = require("../globals");
module.exports = {
    name: "user",
    aliases: ["u"],
    async run(message, args) {
        var unresolvedID = args[0]
            ? args[0]?.replace(/\D/g, "")
            : message.author.id;
        var user = null;
        try {
            user = await __1.client.users.fetch(unresolvedID, true);
        }
        catch (error) {
            return await message.channel.send(error);
        }
        if (!user)
            return;
        const emb = new discord_js_1.MessageEmbed();
        emb.setAuthor(user.tag, user.avatarURL({
            dynamic: true,
        }) ?? user.defaultAvatarURL);
        emb.setThumbnail(user.avatarURL({
            dynamic: true,
        }) ?? user.defaultAvatarURL);
        emb.addField(`❯ User Info`, `:gear: **󠇰ID**: ${user.id}
:link: **Profile**: ${user}
:calendar_spiral: **Created**: ${getLongAgo_1.simpleGetLongAgo(user.createdTimestamp)} ${formatTimestamp_1.formatTimestamp(user.createdAt)}`);
        var mem = message.guild?.member(user) ?? false;
        if (mem) {
            emb.addField("❯ Presence", getPresence_1.getPresence(user, 30));
            const roles = mem.roles.cache.filter((e) => !e.deleted && e.guild.id !== e.id);
            emb.addField("❯ Member Information", `:inbox_tray: **Joined:** ${getLongAgo_1.getLongAgo(mem.joinedTimestamp, 2)} ${formatTimestamp_1.formatTimestamp(mem.joinedAt)}
${roles.size !== 0
                ? `:shield: **Roles** (${roles.size}): ${roles.array().join(", ")}`
                : ""}`);
            emb.addField("❯ Permissions", `:gear: **Permission List**: ${getUserPermissions_1.getUserPermissions(mem)}
        :cyclone: **Bot Level**: __\`${getBotLevel_1.getBotLevel(mem)}\`__`);
        }
        emb.setColor(globals_1.embedColor);
        await message.channel.send(emb);
    },
};
