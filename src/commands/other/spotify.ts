import { MessageEmbed } from "discord.js";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { spotifySearch } from "../../functions/spotifySearch";
import { Color } from "../../globals";
import { ICommand } from "../../interfaces/ICommand";
import { IArtist } from "../../interfaces/ISpotify";
import { messages } from "../../messages";
module.exports = {
  name: "spotify",
  restrictions: {
    level: 30,
  },
  async run(message, args) {
    const search = args.join(" ");
    const track = await spotifySearch(search);
    if (!track)
      return await message.reply(messages.commands.other.spotify.not_found);
    const embed = new MessageEmbed();
    embed.setAuthor(track.artists[0]!.name, track.album.icon.url);
    embed.setThumbnail(track.album.icon.url);
    embed.setTitle(track.name);
    embed.setURL(`https://open.spotify.com/track/${track.id}`);
    embed.addField(
      "❯ Track Info",
      `⌛ **Length**: ${simpleGetLongAgo(Date.now() - track.length * 1000)} long
🔨 **Explicit**: ${track.explicit ? "Yes" : "No"}
🎉 **Popularity**: ${track.popularity}/100`
    );
    embed.addField(
      "❯ Album Info",
      `📝 **Name**: [\`${track.album.name}\`](https://open.spotify.com/album/${
        track.album.id
      })
🔁 **Size**: ${track.album.size} track${track.album.size === 1 ? "" : "s"}
📡 **Created** ${simpleGetLongAgo(
        +new Date(track.album.date)
      )} ago **[**\`${new Date(track.album.date).toLocaleDateString()}\`**]**`
    );
    if (track.artists.length > 1)
      embed.addField(
        "❯ Artists",
        track.artists
          .map(
            (e: IArtist) =>
              `[\`${e.name}\`](https://open.spotify.com/artist/${e.id})`
          )
          .join(" ")
      );
    embed.setColor(Color.spotify);
    await message.reply(embed);
  },
} as ICommand;
