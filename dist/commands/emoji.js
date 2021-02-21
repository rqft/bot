"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
const formatTimestamp_1 = require("../functions/formatTimestamp");
const getLongAgo_1 = require("../functions/getLongAgo");
const globals_1 = require("../globals");
module.exports = {
    name: "emoji",
    aliases: ["e", "emote"],
    description: "Emojis!",
    usesArgs: true,
    cooldown: 5,
    usage: "<emoji: Emoji>",
    async run(message, args) {
        const unresolvedID = args[0].replace(/\D/g, "").toLowerCase();
        var e = __1.client.emojis.cache.get(unresolvedID);
        if (!e) {
            const extension = args[0]?.replace(/[<>]/g, "").startsWith("a")
                ? ".gif"
                : ".png";
            console.log(args[0]?.replace(/[<>]/g, ""));
            const baseURL = "https://cdn.discordapp.com/emojis/";
            return await message.reply("", {
                files: [
                    {
                        name: "emoji" + extension,
                        attachment: baseURL + unresolvedID + extension,
                    },
                ],
            });
        }
        const emb = new discord_js_1.MessageEmbed();
        emb.setColor(globals_1.Color.embed);
        emb.addField("❯ Emoji Info", `${"\uD83D\uDCDD"} **Name**: \`:${e.name}:\`
${"\uD83D\uDD17"} **Emoji**: ${e}
${"\u2699\uFE0F"} **ID**: \`${e.id}\`
${"\uD83D\uDDD3\uFE0F"} **Created**: ${getLongAgo_1.simpleGetLongAgo(e.createdTimestamp)} ago ${formatTimestamp_1.formatTimestamp(e.createdAt)}`);
        emb.addField("❯ Server", `${"\uD83C\uDF9E\uFE0F"} **Animated**: ${e.animated ? "Yes" : "No"}
${"\uD83D\uDCBB"} **Uploaded to** \`${e.guild.name}\` by ${await e.fetchAuthor()}`);
        emb.setThumbnail(e.url);
        return await message.reply(emb);
    },
};
