import { MessageEmbed } from "discord.js";
import { fancyTimeFormat } from "../functions/fancyTimeFormat";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { spotifySearch } from "../functions/spotifySearch";
import { embedColor } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { IArtist } from "../interfaces/spotify/IArtist";

module.exports = {
  name: "spotify",
  async run(message, args) {
    const search = args.join(" ");
    const track = await spotifySearch(search);
    if (!track) {
      return await message.channel.send("Not found");
    }
    const embed = new MessageEmbed();
    embed.setAuthor(track.artists[0]!.name, track.album.icon.url);
    embed.setThumbnail(track.album.icon.url);
    embed.setTitle(track.name);

    embed.setURL(`https://open.spotify.com/track/${track.id}`);
    embed.addField(
      "❯ Track Info",
      `Length: **${fancyTimeFormat(track.length)}**
      Explicit: **${track.explicit ? "Yes" : "No"}**
Popularity: **${track.popularity}/100**`
    );
    embed.addField(
      "❯ Album Info",
      `Name: [**\`${track.album.name}\`**](https://open.spotify.com/album/${
        track.album.id
      })
Tracks: **${track.album.size}**
Created At: **${simpleGetLongAgo(
        +new Date(track.album.date)
      )} ago** **[**\`${new Date(track.album.date).toLocaleDateString()}\`**]**`
    );
    embed.addField(
      "❯ Artists",
      track.artists
        .map(
          (e: IArtist) =>
            `[\`${e.name}\`](https://open.spotify.com/artist/${e.id})`
        )
        .join(", ")
    );
    embed.setColor(embedColor);
    await message.channel.send(embed);
  },
} as ICommand;
