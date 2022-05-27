"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pxl = void 0;
const pariah_1 = require("pariah");
const constants_1 = require("../../constants");
const secrets_1 = require("../../secrets");
const markdown_1 = require("../markdown");
const paginator_1 = require("../paginator");
const tools_1 = require("../tools");
const embed_1 = require("./embed");
var Pxl;
(function (Pxl) {
    Pxl.instance = new pariah_1.APIs.PxlAPI.API(secrets_1.Secrets.Key.PxlAPI);
    async function ajit(context, args) {
        const { target } = args;
        const { payload: image } = await Pxl.instance.ajit([target]);
        const embed = await embed_1.Embed.image(context, image, "ajit.png", constants_1.Brand.PXL);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Pxl.ajit = ajit;
    async function emojiMosaic(context, args) {
        const { target, scale } = args;
        const { payload: image } = await Pxl.instance.emojiMosaic([target], args["group-size"], scale);
        const embed = await embed_1.Embed.image(context, image, "emoji-mosaic.png", constants_1.Brand.PXL);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Pxl.emojiMosaic = emojiMosaic;
    async function eyes(context, args) {
        const { target, type } = args;
        const { payload: image } = await Pxl.instance.eyes([target], type);
        const embed = await embed_1.Embed.image(context, image, `eyes-${type}.png`, constants_1.Brand.PXL);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Pxl.eyes = eyes;
    async function flag(context, args) {
        const { target, flag, opacity } = args;
        const { payload: image } = await Pxl.instance.flag([target], flag, opacity);
        const embed = await embed_1.Embed.image(context, image, `flag-${flag}.png`, constants_1.Brand.PXL);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Pxl.flag = flag;
    async function glitch(context, args) {
        const { target, iterations, amount } = args;
        const { payload: image } = await Pxl.instance.glitch([target], iterations, amount, {
            count: args["gif-count"],
            delay: args["gif-delay"],
        });
        const embed = await embed_1.Embed.image(context, image, "glitch.gif", constants_1.Brand.PXL);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Pxl.glitch = glitch;
    async function imageSearch(context, args) {
        const { query } = args;
        const { payload: data } = await Pxl.instance.imageSearch(query, pariah_1.APIs.PxlAPI.SafeSearch.STRICT, true);
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
    Pxl.imageSearch = imageSearch;
    async function jpeg(context, args) {
        const { target, quality } = args;
        const { payload: image } = await Pxl.instance.jpeg([target], quality);
        const embed = await embed_1.Embed.image(context, image, "jpeg.png", constants_1.Brand.PXL);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Pxl.jpeg = jpeg;
    async function lego(context, args) {
        const { target, scale } = args;
        const { payload: image } = await Pxl.instance.lego([target], args["group-size"], scale);
        const embed = await embed_1.Embed.image(context, image, "lego.png", constants_1.Brand.PXL);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Pxl.lego = lego;
    async function screenshot(context, args) {
        const { url, browser, locale, theme } = args;
        const { payload: image } = await Pxl.instance.screenshot(url.toString(), {
            browser,
            locale,
            theme,
            fullPage: args["full-page"],
        });
        const embed = await embed_1.Embed.image(context, image, "screenshot.png", constants_1.Brand.PXL);
        embed.setDescription(`URL: ${url.toString()}`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Pxl.screenshot = screenshot;
    async function snapchat(context, args) {
        const { target, filter } = args;
        const { payload: image } = await Pxl.instance.snapchat([target], filter);
        const embed = await embed_1.Embed.image(context, image, "snapchat.png", constants_1.Brand.PXL);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Pxl.snapchat = snapchat;
    async function sonic(context, args) {
        const { text } = args;
        const { payload: image } = await Pxl.instance.sonic(text);
        const embed = await embed_1.Embed.image(context, image, "sonic.png", constants_1.Brand.PXL);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Pxl.sonic = sonic;
    async function thonkify(context, args) {
        const { text } = args;
        const { payload: image } = await Pxl.instance.thonkify(text);
        const embed = await embed_1.Embed.image(context, image, "thonkify.png", constants_1.Brand.PXL);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Pxl.thonkify = thonkify;
    async function webSearch(context, args) {
        const { query } = args;
        const { payload: data } = await Pxl.instance.webSearch(query, pariah_1.APIs.PxlAPI.SafeSearch.STRICT);
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
    Pxl.webSearch = webSearch;
})(Pxl = exports.Pxl || (exports.Pxl = {}));
