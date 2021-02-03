"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fancyTimeFormat_1 = require("../functions/fancyTimeFormat");
const getLongAgo_1 = require("../functions/getLongAgo");
const spotifySearch_1 = require("../functions/spotifySearch");
const globals_1 = require("../globals");
module.exports = {
    name: "spotify",
    async run(message, args) {
        const search = args.join(" ");
        const track = await spotifySearch_1.spotifySearch(search);
        if (!track) {
            return await message.channel.send("Not found");
        }
        const embed = new discord_js_1.MessageEmbed();
        embed.setAuthor(track.artists[0].name, track.album.icon.url);
        embed.setThumbnail(track.album.icon.url);
        embed.setTitle(track.name);
        embed.setURL(`https://open.spotify.com/track/${track.id}`);
        embed.addField("❯ Track Info", `Length: **${fancyTimeFormat_1.fancyTimeFormat(track.length)}**
      Explicit: **${track.explicit ? "Yes" : "No"}**
Popularity: **${track.popularity}/100**`);
        embed.addField("❯ Album Info", `Name: [**\`${track.album.name}\`**](https://open.spotify.com/album/${track.album.id})
Tracks: **${track.album.size}**
Created At: **${getLongAgo_1.simpleGetLongAgo(+new Date(track.album.date))} ago** **[**\`${new Date(track.album.date).toLocaleDateString()}\`**]**`);
        embed.addField("❯ Artists", track.artists
            .map((e) => `[\`${e.name}\`](https://open.spotify.com/artist/${e.id})`)
            .join(", "));
        embed.setColor(globals_1.embedColor);
        await message.channel.send(embed);
    },
};
