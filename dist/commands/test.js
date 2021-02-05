"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const formatTimestamp_1 = require("../functions/formatTimestamp");
const getLongAgo_1 = require("../functions/getLongAgo");
const getUserPermissions_1 = require("../functions/getUserPermissions");
const globals_1 = require("../globals");
module.exports = {
    name: "test",
    description: "AAAAAAA",
    restrictions: {
        guildOnly: true,
    },
    usage: "<role: Role>",
    usesArgs: false,
    async run(message, args) {
        if (!message.guild)
            return;
        var unresolvedID = args.join(" ").length
            ? args.join(" ")
            : message.member?.roles.highest.id;
        var role = null;
        try {
            role = message.guild.roles.cache.find((e) => e.name.toLowerCase() == unresolvedID ||
                e.id == unresolvedID ||
                `${e}` == unresolvedID);
        }
        catch (error) { }
        if (!role) {
            return await message.channel.send("Unknown Role");
        }
        const col = role.color
            ? `https://singlecolorimage.com/get/${role.hexColor.replace("#", "")}/256x256`
            : undefined;
        const emb = new discord_js_1.MessageEmbed();
        emb.setAuthor(`Role "${role.name}"`, col);
        emb.setColor(globals_1.Color.embed);
        emb.addField(`❯ Role Info`, `:gear: **ID**: \`${role.id}\`
:link: **Role**: ${role}
:calendar_spiral: **Created**: ${getLongAgo_1.simpleGetLongAgo(+role.createdAt)} ${formatTimestamp_1.formatTimestamp(role.createdAt)}`);
        const posTop = message.guild.roles.cache.filter((e) => e.position == role.position - 1);
        const posLow = message.guild.roles.cache.filter((e) => e.position == role.position + 1);
        emb.addField("❯ Position", `**${posTop.size ? posTop.array()[0]?.position : ""} ${posTop.size ? posTop.array()[0] : "-- Top Of Role list"}**
**- ${role.position} ${role}**
**${posLow.size ? posLow.array()[0]?.position : ""} ${posLow.size ? posLow.array()[0] : "-- Bottom Of Role list"}**`);
        emb.addField("❯ Permissions", getUserPermissions_1.getUserPermissions(role));
        emb.addField("❯ Members", role.members.size ? role.members.array().join(", ") : "None");
        console.log(emb);
        await message.channel.send(emb);
    },
};
