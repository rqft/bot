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
})(Search = exports.Search || (exports.Search = {}));
