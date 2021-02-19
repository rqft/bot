"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const getLongAgo_1 = require("../functions/getLongAgo");
const spotifySearch_1 = require("../functions/spotifySearch");
const globals_1 = require("../globals");
module.exports = {
    name: "spotify",
    description: "get a song from spotify",
    usage: "<query: string>",
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
        embed.addField("❯ Track Info", `Length: **${getLongAgo_1.simpleGetLongAgo(Date.now() - track.length * 1000)}**
      Explicit: **${track.explicit ? "Yes" : "No"}**
Popularity: **${track.popularity}/100**`);
        embed.addField("❯ Album Info", `Name: [**\`${track.album.name}\`**](https://open.spotify.com/album/${track.album.id})
Tracks: **${track.album.size}**
Created **${getLongAgo_1.simpleGetLongAgo(+new Date(track.album.date))} ago** **[**\`${new Date(track.album.date).toLocaleDateString()}\`**]**`);
        embed.addField("❯ Artists", track.artists
            .map((e) => `[\`${e.name}\`](https://open.spotify.com/artist/${e.id})`)
            .join(", "));
        embed.setColor(globals_1.Color.spotify);
        await message.channel.send(embed);
    },
};
