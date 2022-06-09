"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const pariah_1 = require("pariah");
const constants_1 = require("../../constants");
const secrets_1 = require("../../secrets");
const api_1 = require("../api");
const emojis_1 = require("../emojis");
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const paginator_1 = require("../paginator");
const tools_1 = require("../tools");
const basic_1 = require("./basic");
const embed_1 = require("./embed");
const pxl_1 = require("./pxl");
var Search;
(function (Search) {
    Search.youtubeInstance = new api_1.YoutubeSearch.API(secrets_1.Secrets.Key.Google.YouTubeData);
    async function youtube(context, args) {
        const { query } = args;
        const { payload } = await Search.youtubeInstance.search(query);
        if (!payload.items.length) {
            throw new error_1.Err("No results found", { status: 404 });
        }
        const paginator = new paginator_1.Paginator(context, {
            pageLimit: payload.items.length,
            onPage(page) {
                const embed = embed_1.Embed.user(context);
                const item = payload.items[page - 1];
                embed.setTitle(item.snippet.title);
                embed.setDescription(item.snippet.description.replace(/\n{2,}/g, "\n\n"));
                embed.setImage(item.snippet.thumbnails.high.url);
                embed.setUrl(`https://www.youtube.com/watch?v=${item.id.videoId}`);
                embed.addField("Channel", `[${item.snippet.channelTitle}](https://www.youtube.com/channel/${item.snippet.channelId})`, true);
                embed.addField("Created At", `${markdown_1.Markdown.Format.timestamp(new Date(item.snippet.publishedAt))}`, true);
                return embed;
            },
        });
        return await paginator.start();
    }
    Search.youtube = youtube;
    const pxlInstance = pxl_1.Pxl.instance;
    async function image(context, args) {
        const { query } = args;
        const { payload: data } = await pxlInstance.imageSearch(query, pariah_1.APIs.PxlAPI.SafeSearch.STRICT, true);
        const paginator = new paginator_1.Paginator(context, {
            pageLimit: data.length,
            onPage: async (page) => {
                const image = data[page - 1];
                const embed = await embed_1.Embed.image(context, image.url, "image-search.png", constants_1.Brand.PXL);
                embed.setDescription(markdown_1.Markdown.Format.link(image.title, image.location).toString());
                return embed;
            },
        });
        return await paginator.start();
    }
    Search.image = image;
    async function web(context, args) {
        const { query } = args;
        const { payload: data } = await pxlInstance.webSearch(query, pariah_1.APIs.PxlAPI.SafeSearch.STRICT);
        const paginator = new paginator_1.Paginator(context, {
            pageLimit: data.results.length,
            onPage: async (page) => {
                const result = data.results[page - 1];
                const embed = embed_1.Embed.brand(context, constants_1.Brand.PXL);
                embed.setDescription(result.description);
                embed.setTitle(result.title);
                embed.setUrl(result.url);
                if (data.relatedQueries.length) {
                    embed.addField("Related Queries", data.relatedQueries.map((x) => `\`${x}\``).join(", "));
                }
                if (data.images[page - 1]) {
                    embed.setThumbnail(data.images[page - 1]);
                }
                return embed;
            },
        });
        return await paginator.start();
    }
    Search.web = web;
    Search.DictionaryInstance = new pariah_1.APIs.Dictionary.API(2, "en");
    async function define(context, args) {
        const { query } = args;
        const { payload, status } = await Search.DictionaryInstance.entries(query);
        if ("title" in payload) {
            throw new error_1.Err(payload.title, { status });
        }
        const pages = payload
            .map((x) => x.meanings.map((y) => ({ ...x, meaning: y })))
            .flat();
        const paginator = new paginator_1.Paginator(context, {
            pageLimit: pages.length,
            onPage(page) {
                const item = pages[page - 1];
                const embed = embed_1.Embed.user(context);
                embed.setTitle(item.word);
                {
                    const description = [];
                    for (const phonetic of item.phonetics) {
                        description.push(`[${phonetic.text || item.word}](${phonetic.audio || phonetic.sourceUrl})`);
                    }
                    embed.addField("Phonetics", description.join(", "));
                }
                {
                    const description = [];
                    for (const { definition, example } of item.meaning.definitions) {
                        description.push(" - " +
                            definition +
                            (example ? " " + markdown_1.Markdown.Format.italics(example) : ""));
                    }
                    const fields = (0, tools_1.splitToFields)(description.join("\n"), 512, "\n");
                    for (const field of fields) {
                        embed.addField("Definitions", field, true);
                    }
                }
                return embed;
            },
        });
        return await paginator.start();
    }
    Search.define = define;
    async function definitions(context) {
        const req = new pariah_1.Requester(new URL("https://www.merriam-webster.com/lapi/v1/"));
        if (!context.value) {
            const results = (await req.json("/mwol-mp/get-lookups-data-homepage")).payload.data
                .words;
            return await context.respond({
                choices: [
                    {
                        name: "Type or pick one of the words below",
                        value: "...",
                    },
                    ...results
                        .slice(0, 24)
                        .map((x) => ({ name: (0, tools_1.toTitleCase)(x), value: x })),
                ],
            });
        }
        const words = new Set((await req.json(`/mwol-search/autocomplete`, {
            search: context.value,
        })).payload.docs
            .filter((x) => x.ref === "owl-combined")
            .map((x) => x.word)
            .slice(0, 25));
        return await context.respond({
            choices: Array.from(words).map((x) => ({
                name: (0, tools_1.toTitleCase)(x),
                value: x,
            })),
        });
    }
    Search.definitions = definitions;
    Search.UrbanInstance = new pariah_1.APIs.Urban.API();
    async function urban(context, args) {
        const { query } = args;
        const { payload } = await Search.UrbanInstance.define(query);
        if (!payload.list.length) {
            throw new error_1.Err("No results found", { status: 404 });
        }
        const paginator = new paginator_1.Paginator(context, {
            pageLimit: payload.list.length,
            onPage(page) {
                const item = payload.list[page - 1];
                const embed = embed_1.Embed.user(context);
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
    Search.urban = urban;
    function fixUrbanLinks(data) {
        return data.replace(/\[(.+?)\]/g, (_, g1) => `[${g1}](https://www.urbandictionary.com/define.php?term=${encodeURIComponent(g1)})`);
    }
    Search.fixUrbanLinks = fixUrbanLinks;
    Search.SpotifyInstance = new pariah_1.APIs.Spotify.API(...secrets_1.Secrets.Key.Spotify);
    async function spotify(context, args) {
        const { query, type } = args;
        await Search.SpotifyInstance.loadCredentials();
        const { payload } = await Search.SpotifyInstance.searchForItem(query, type);
        if ("error" in payload) {
            throw new error_1.Err(payload.error.message, { status: payload.error.status });
        }
        let total = [];
        for (const key in payload) {
            const list = payload[key];
            if (list !== undefined) {
                for (const item of list.items) {
                    if (item) {
                        total.push(item);
                    }
                }
            }
        }
        if (!total.length) {
            throw new error_1.Err("No results found", { status: 404 });
        }
        const paginator = new paginator_1.Paginator(context, {
            pageLimit: total.length,
            onPage(page) {
                const item = total[page - 1];
                console.log(total);
                const embed = embed_1.Embed.user(context);
                embed.setTitle(item.name);
                embed.setUrl(item.external_urls.spotify);
                switch (item.type) {
                    case pariah_1.APIs.Spotify.Keys.TRACK: {
                        const image = getLargestImage(item.album.images);
                        if (image) {
                            embed.setThumbnail(image.url);
                        }
                        {
                            const description = [];
                            description.push(basic_1.Basic.field("<:IconGui_AddFile:799643046614007838>", "Disc", item.album.album_type === "single"
                                ? "1"
                                : item.disc_number.toLocaleString()));
                            description.push(basic_1.Basic.field(emojis_1.Emojis.WARNING, "Explicit", item.explicit ? "Yes" : "No"));
                            description.push(basic_1.Basic.field("<:IconGui_Slowmode:798624247337058354>", "Duration", markdown_1.Markdown.toTimeString(item.duration_ms, undefined, false)));
                            description.push(basic_1.Basic.field("<:IconGui_Invite:798624241347198987>", "Popularity", item.popularity.toLocaleString() + "%"));
                            description.push(basic_1.Basic.field("<:IconGui_Settings:798624241402511420>", "Restriction", item.restrictions?.reason || "None"));
                            embed.addField("Track", description.join("\n"));
                        }
                        {
                            embed.addField((0, tools_1.toTitleCase)(item.album.album_type), generateAlbumDescription(item.album));
                        }
                        embed.addField("Artists", item.artists
                            .map((x) => `[${x.name}](${x.external_urls.spotify})`)
                            .join(", "));
                        break;
                    }
                    case pariah_1.APIs.Spotify.Keys.ALBUM: {
                        const image = getLargestImage(item.images);
                        if (image) {
                            embed.setThumbnail(image.url);
                        }
                        embed.setDescription(generateAlbumDescription(item));
                        break;
                    }
                    case pariah_1.APIs.Spotify.Keys.ARTIST: {
                        const image = getLargestImage(item.images);
                        if (image) {
                            embed.setThumbnail(image.url);
                        }
                        {
                            const description = [];
                            description.push(basic_1.Basic.field("<:IconGui_Members:798624241868079104>", "Followers", item.followers.total.toLocaleString()));
                            description.push(basic_1.Basic.field("<:IconGui_Invite:798624241347198987>", "Popularity", item.popularity.toLocaleString() + "%"));
                            description.push(basic_1.Basic.field("<:IconGui_RichPresence:798624241351655514>", "Genres", item.genres
                                .map((v) => markdown_1.Markdown.Format.codestring(v))
                                .join(", ") || "`unknown`"));
                            embed.setDescription(description.join("\n"));
                        }
                        break;
                    }
                    case pariah_1.APIs.Spotify.Keys.PLAYLIST: {
                        const image = getLargestImage(item.images);
                        if (image) {
                            embed.setThumbnail(image.url);
                        }
                        {
                            const description = [];
                            if (item.description) {
                                description.push(markdown_1.Markdown.Format.italics(item.description).toString() + "\n");
                            }
                            description.push(basic_1.Basic.field("<:IconGui_OwnerCrown:799657143719952415>", "Owner", `[${item.owner.display_name}](${item.owner.external_urls.spotify})`));
                            if (item.followers) {
                                description.push(basic_1.Basic.field("<:IconGui_Members:798624241868079104>", "Followers", item.followers.total.toLocaleString()));
                            }
                            description.push(basic_1.Basic.field("<:IconGui_AddFile:799643046614007838>", "Tracks", item.tracks.total.toLocaleString()));
                            description.push(basic_1.Basic.field("<:IconGui_Discovery:836649540051664936>", "Public", item.public ? "Yes" : "No"));
                            embed.setDescription(description.join("\n"));
                        }
                        break;
                    }
                    default: {
                        embed.setDescription("Encountered an unknown type");
                    }
                }
                return embed;
            },
        });
        return await paginator.start();
    }
    Search.spotify = spotify;
    function getLargestImage(images) {
        return images.reduce((a, b) => (a ? (a.width > b.width ? a : b) : b), undefined);
    }
    Search.getLargestImage = getLargestImage;
    function generateAlbumDescription(album) {
        const description = [];
        description.push(basic_1.Basic.field("<:IconGui_RichPresence:798624241351655514>", "Name", `[${album.name}](${album.external_urls.spotify})`));
        description.push(basic_1.Basic.field("<:IconGui_Members:798624241868079104>", "Artists", album.artists
            .map((x) => `[${x.name}](${x.external_urls.spotify})`)
            .join(", ")));
        description.push(basic_1.Basic.field(emojis_1.Emojis.CALENDAR, "Release Date", (0, tools_1.buildTimestampString)(Date.parse(album.release_date))));
        description.push(basic_1.Basic.field("<:IconChannel_Category:798624247122493450>", "Tracks", album.total_tracks.toLocaleString()));
        description.push(basic_1.Basic.field("<:IconGui_Deafened:798624239208104019>", "Restrictions", album.restrictions?.reason || "None"));
        return description.join("\n");
    }
    Search.generateAlbumDescription = generateAlbumDescription;
})(Search = exports.Search || (exports.Search = {}));
