"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
const formatTimestamp_1 = require("../functions/formatTimestamp");
const getLongAgo_1 = require("../functions/getLongAgo");
const globals_1 = require("../globals");
module.exports = {
    name: "test",
    description: "TESTING",
    restrictions: {
        ownerOnly: true,
    },
    async run(message, args) {
        const unresolvedID = args[0].replace(/\D/g, "");
        var e = __1.client.emojis.cache.get(unresolvedID);
        if (!e) {
            const extension = args[0]?.replace(/[<>]/g, "").startsWith("a")
                ? ".gif"
                : ".png";
            console.log(args[0]?.replace(/[<>]/g, ""));
            const baseURL = "https://cdn.discordapp.com/emojis/";
            return await message.channel.send("", {
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
        emb.addField("❯ Emoji Info", `:pencil: **Name**: \`:${e.name}:\`
:link: **Emoji**: ${e}
:gear: **ID**: \`${e.id}\`
:calendar_spiral: **Created**: ${getLongAgo_1.simpleGetLongAgo(e.createdTimestamp)} ${formatTimestamp_1.formatTimestamp(e.createdAt)}`);
        emb.addField("❯ Server", `:film_frames: **Animated**: ${e.animated ? "Yes" : "No"}
:computer: **Uploaded to** \`${e.guild.name}\` by ${await e.fetchAuthor()}`);
        emb.setThumbnail(e.url);
        return await message.channel.send(emb);
    },
};
