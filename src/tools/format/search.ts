/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from "detritus-client/lib/command";
import {
  InteractionAutoCompleteContext,
  InteractionContext,
} from "detritus-client/lib/interaction";
import { Message } from "detritus-client/lib/structures";
import { APIs, Requester } from "pariah";
import { Brand } from "../../constants";
import { Secrets } from "../../secrets";
import { YoutubeSearch } from "../api";
import { CustomEmojis, Emojis } from "../emojis";
import { Err } from "../error";
import { Markdown } from "../markdown";
import { Paginator } from "../paginator";
import { buildTimestampString, splitToFields, toTitleCase } from "../tools";
import { Basic } from "./basic";
import { Embed } from "./embed";
import { Pxl } from "./pxl";

export module Search {
  export const youtubeInstance = new YoutubeSearch.API(
    Secrets.Key.Google.YouTubeData
  );

  export interface SearchArgs {
    query: string;
  }

  export async function youtube(
    context: Context | InteractionContext,
    args: SearchArgs
  ): Promise<Message | null> {
    const { query } = args;
    const { payload } = await youtubeInstance.search(query);

    if (!payload.items.length) {
      throw new Err("No results found", { status: 404 });
    }

    const paginator = new Paginator(context, {
      pageLimit: payload.items.length,
      onPage(page: number) {
        const embed = Embed.user(context);

        const item = payload.items[page - 1]!;

        embed.setTitle(item.snippet.title);
        embed.setDescription(
          item.snippet.description.replace(/\n{2,}/g, "\n\n")
        );

        embed.setImage(item.snippet.thumbnails.high.url);

        embed.setUrl(`https://www.youtube.com/watch?v=${item.id.videoId}`);

        embed.addField(
          "Channel",
          `[${item.snippet.channelTitle}](https://www.youtube.com/channel/${item.snippet.channelId})`,
          true
        );

        embed.addField(
          "Created At",
          `${Markdown.Format.timestamp(new Date(item.snippet.publishedAt))}`,
          true
        );

        return embed;
      },
    });

    return await paginator.start();
  }

  const pxlInstance = Pxl.instance;

  export async function image(
    context: Context | InteractionContext,
    args: SearchArgs
  ) {
    const { query } = args;
    const { payload: data } = await pxlInstance.imageSearch(
      query,
      APIs.PxlAPI.SafeSearch.STRICT,
      true
    );

    const paginator = new Paginator(context, {
      pageLimit: data.length,
      onPage: async (page) => {
        const image = data[page - 1]!;
        const embed = await Embed.image(
          context,
          image.url,
          "image-search.png",
          Brand.PXL
        );
        embed.setDescription(
          Markdown.Format.link(image.title, image.location).toString()
        );
        return embed;
      },
    });

    return await paginator.start();
  }

  export async function web(
    context: Context | InteractionContext,
    args: SearchArgs
  ) {
    const { query } = args;

    const { payload: data } = await pxlInstance.webSearch(
      query,
      APIs.PxlAPI.SafeSearch.STRICT
    );
    const paginator = new Paginator(context, {
      pageLimit: data.results.length,
      onPage: async (page) => {
        const result = data.results[page - 1]!;
        const embed = Embed.brand(context, Brand.PXL);

        embed.setDescription(result.description);
        embed.setTitle(result.title);
        embed.setUrl(result.url);

        if (data.relatedQueries.length) {
          embed.addField(
            "Related Queries",
            data.relatedQueries.map((x) => `\`${x}\``).join(", ")
          );
        }

        if (data.images[page - 1]) {
          embed.setThumbnail(data.images[page - 1]!);
        }

        return embed;
      },
    });

    return await paginator.start();
  }

  export const DictionaryInstance = new APIs.Dictionary.API(2, "en");

  export async function define(
    context: Context | InteractionContext,
    args: SearchArgs
  ): Promise<Message | null> {
    const { query } = args;
    const { payload, status } = await DictionaryInstance.entries(query);

    if ("title" in payload) {
      throw new Err(payload.title, { status });
    }

    const pages = payload
      .map((x) => x.meanings.map((y) => ({ ...x, meaning: y })))
      .flat();

    const paginator = new Paginator(context, {
      pageLimit: pages.length,
      onPage(page) {
        const item = pages[page - 1]!;
        const embed = Embed.user(context);

        embed.setTitle(item.word);

        {
          const description: Array<string> = [];

          for (const phonetic of item.phonetics) {
            description.push(
              `[${phonetic.text || item.word}](${
                phonetic.audio || phonetic.sourceUrl
              })`
            );
          }

          embed.addField("Phonetics", description.join(", "));
        }

        {
          const description: Array<string> = [];
          for (const { definition, example } of item.meaning.definitions) {
            // if (description.join("\n\n").length > 950) {
            //   break;
            // }
            description.push(
              " - " +
                definition +
                (example ? " " + Markdown.Format.italics(example) : "")
            );
          }

          const fields = splitToFields(description.join("\n"), 512, "\n");

          for (const field of fields) {
            embed.addField("Definitions", field, true);
          }
        }

        return embed;
      },
    });

    return await paginator.start();
  }

  export async function definitions(context: InteractionAutoCompleteContext) {
    const req = new Requester(
      new URL("https://www.merriam-webster.com/lapi/v1/")
    );

    if (!context.value) {
      const results: Array<string> =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (await req.json<any>("/mwol-mp/get-lookups-data-homepage")).payload.data
          .words;

      return await context.respond({
        choices: [
          {
            name: "Type or pick one of the words below",
            value: "...",
          },
          ...results
            .slice(0, 24)
            .map((x) => ({ name: toTitleCase(x), value: x })),
        ],
      });
    }

    const words: Set<string> = new Set(
      (
        await req.json<any>(`/mwol-search/autocomplete`, {
          search: context.value,
        })
      ).payload.docs
        .filter((x: { ref: string }) => x.ref === "owl-combined")
        .map((x: { word: string }) => x.word)
        .slice(0, 25)
    );

    return await context.respond({
      choices: Array.from(words).map((x) => ({
        name: toTitleCase(x),
        value: x,
      })),
    });
  }

  export const UrbanInstance = new APIs.Urban.API();

  export async function urban(
    context: Context | InteractionContext,
    args: SearchArgs
  ): Promise<Message | null> {
    const { query } = args;

    const { payload } = await UrbanInstance.define(query);

    if (!payload.list.length) {
      throw new Err("No results found", { status: 404 });
    }

    const paginator = new Paginator(context, {
      pageLimit: payload.list.length,
      onPage(page) {
        const item = payload.list[page - 1]!;
        const embed = Embed.user(context);

        embed.setTitle(item.word);
        embed.setDescription(fixUrbanLinks(item.definition));
        embed.setUrl(item.permalink);

        embed.addField("Example", fixUrbanLinks(item.example));

        embed.setTimestamp(item.written_on);

        embed.addField("Upvotes", item.thumbs_up.toLocaleString(), true);
        embed.addField("Downvotes", item.thumbs_down.toLocaleString(), true);

        return embed;
      },
    });

    return await paginator.start();
  }

  export function fixUrbanLinks(data: string) {
    return data.replace(
      /\[(.+?)\]/g,
      (_, g1: string) =>
        `[${g1}](https://www.urbandictionary.com/define.php?term=${encodeURIComponent(
          g1
        )})`
    );
  }

  export const SpotifyInstance = new APIs.Spotify.API(...Secrets.Key.Spotify);

  export interface SpotifyArgs extends SearchArgs {
    type?: Array<APIs.Spotify.Keys>;
  }

  export async function spotify(
    context: Context | InteractionContext,
    args: SpotifyArgs
  ): Promise<Message | null> {
    const { query, type } = args;

    // load cred
    await SpotifyInstance.loadCredentials();

    const { payload } = await SpotifyInstance.searchForItem(query, type);

    if ("error" in payload) {
      throw new Err(payload.error.message, { status: payload.error.status });
    }

    let total: Array<
      APIs.Spotify.SearchTotal[APIs.Spotify.KeysPlural[APIs.Spotify.Keys]]["items"][number]
    > = [];

    for (const key in payload) {
      const list = payload[key as APIs.Spotify.KeysPlural[APIs.Spotify.Keys]];
      if (list !== undefined) {
        for (const item of list.items) {
          if (item) {
            total.push(item);
          }
        }
      }
    }

    if (!total.length) {
      throw new Err("No results found", { status: 404 });
    }

    const paginator = new Paginator(context, {
      pageLimit: total.length,
      onPage(page) {
        const item = total[page - 1]!;
        console.log(total);
        const embed = Embed.user(context);

        embed.setTitle(item.name);
        embed.setUrl(item.external_urls.spotify);

        switch (item.type) {
          case APIs.Spotify.Keys.TRACK: {
            const image = getLargestImage(item.album.images);
            if (image) {
              embed.setThumbnail(image.url);
            }

            // track
            {
              const description: Array<string> = [];

              description.push(
                Basic.field(
                  CustomEmojis.GUI_ADD_FILE,
                  "Disc",
                  item.album.album_type === "single"
                    ? "1"
                    : item.disc_number.toLocaleString()
                )
              );

              description.push(
                Basic.field(
                  Emojis.WARNING,
                  "Explicit",
                  item.explicit ? "Yes" : "No"
                )
              );

              description.push(
                Basic.field(
                  CustomEmojis.GUI_SLOWMODE,
                  "Duration",
                  Markdown.toTimeString(item.duration_ms, undefined, false)
                )
              );

              description.push(
                Basic.field(
                  CustomEmojis.GUI_INVITE,
                  "Popularity",
                  item.popularity.toLocaleString() + "%"
                )
              );

              description.push(
                Basic.field(
                  CustomEmojis.GUI_SETTINGS,
                  "Restriction",
                  item.restrictions?.reason || "None"
                )
              );

              embed.addField("Track", description.join("\n"));
            }

            // album
            {
              embed.addField(
                toTitleCase(item.album.album_type),
                generateAlbumDescription(item.album)
              );
            }

            // artists

            embed.addField(
              "Artists",
              item.artists
                .map((x) => `[${x.name}](${x.external_urls.spotify})`)
                .join(", ")
            );

            break;
          }

          case APIs.Spotify.Keys.ALBUM: {
            const image = getLargestImage(item.images);
            if (image) {
              embed.setThumbnail(image.url);
            }

            embed.setDescription(generateAlbumDescription(item));
            break;
          }

          case APIs.Spotify.Keys.ARTIST: {
            const image = getLargestImage(item.images);
            if (image) {
              embed.setThumbnail(image.url);
            }

            {
              const description: Array<string> = [];

              description.push(
                Basic.field(
                  CustomEmojis.GUI_MEMBERS,
                  "Followers",
                  item.followers.total.toLocaleString()
                )
              );

              description.push(
                Basic.field(
                  CustomEmojis.GUI_INVITE,
                  "Popularity",
                  item.popularity.toLocaleString() + "%"
                )
              );

              description.push(
                Basic.field(
                  CustomEmojis.GUI_RICH_PRESENCE,
                  "Genres",
                  item.genres
                    .map((v) => Markdown.Format.codestring(v))
                    .join(", ") || "`unknown`"
                )
              );

              embed.setDescription(description.join("\n"));
            }

            break;
          }

          case APIs.Spotify.Keys.PLAYLIST: {
            const image = getLargestImage(item.images);
            if (image) {
              embed.setThumbnail(image.url);
            }

            {
              const description: Array<string> = [];

              if (item.description) {
                description.push(
                  Markdown.Format.italics(item.description).toString() + "\n"
                );
              }

              description.push(
                Basic.field(
                  CustomEmojis.GUI_OWNERCROWN,
                  "Owner",
                  `[${item.owner.display_name}](${item.owner.external_urls.spotify})`
                )
              );

              if (item.followers) {
                description.push(
                  Basic.field(
                    CustomEmojis.GUI_MEMBERS,
                    "Followers",
                    item.followers.total.toLocaleString()
                  )
                );
              }

              description.push(
                Basic.field(
                  CustomEmojis.GUI_ADD_FILE,
                  "Tracks",
                  item.tracks.total.toLocaleString()
                )
              );

              description.push(
                Basic.field(
                  CustomEmojis.GUI_DISCOVERY,
                  "Public",
                  item.public ? "Yes" : "No"
                )
              );

              embed.setDescription(description.join("\n"));
            }

            break;
          }

          default: {
            // shows/episodes are never shown for some reason
            embed.setDescription("Encountered an unknown type");
          }
        }

        return embed;
      },
    });

    return await paginator.start();
  }

  export function getLargestImage(
    images: Array<APIs.Spotify.Image>
  ): APIs.Spotify.Image | undefined {
    return images.reduce<undefined | APIs.Spotify.Image>(
      (a, b) => (a ? (a.width > b.width ? a : b) : b),
      undefined
    );
  }

  export function generateAlbumDescription(album: APIs.Spotify.Album) {
    const description: Array<string> = [];

    description.push(
      Basic.field(
        CustomEmojis.GUI_RICH_PRESENCE,
        "Name",
        `[${album.name}](${album.external_urls.spotify})`
      )
    );

    description.push(
      Basic.field(
        CustomEmojis.GUI_MEMBERS,
        "Artists",
        album.artists
          .map((x) => `[${x.name}](${x.external_urls.spotify})`)
          .join(", ")
      )
    );

    description.push(
      Basic.field(
        Emojis.CALENDAR,
        "Release Date",
        buildTimestampString(Date.parse(album.release_date))
      )
    );

    description.push(
      Basic.field(
        CustomEmojis.CHANNEL_CATEGORY,
        "Tracks",
        album.total_tracks.toLocaleString()
      )
    );

    description.push(
      Basic.field(
        CustomEmojis.GUI_DEAFENED,
        "Restrictions",
        album.restrictions?.reason || "None"
      )
    );

    return description.join("\n");
  }
}
