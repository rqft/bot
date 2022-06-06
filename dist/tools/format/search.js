"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const pariah_1 = require("pariah");
const constants_1 = require("../../constants");
const secrets_1 = require("../../secrets");
const api_1 = require("../api");
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const paginator_1 = require("../paginator");
const tools_1 = require("../tools");
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
})(Search = exports.Search || (exports.Search = {}));
