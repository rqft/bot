"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSearch = exports.thonkify = exports.sonic = exports.snapchat = exports.screenshot = exports.lego = exports.jpeg = exports.imageSearch = exports.glitch = exports.flag = exports.eyes = exports.emojiMosaic = exports.ajit = exports.instance = void 0;
const pariah_1 = require("pariah");
const constants_1 = require("../../constants");
const secrets_1 = require("../../secrets");
const markdown_1 = require("../markdown");
const paginator_1 = require("../paginator");
const tools_1 = require("../tools");
const Embed = __importStar(require("./embed"));
exports.instance = new pariah_1.APIs.PxlAPI.API(secrets_1.Secrets.Key.PxlAPI);
async function ajit(context, args) {
    const { target } = args;
    const image = await exports.instance.ajit([target]);
    const embed = await Embed.image(context, image, "ajit.png", constants_1.Brand.PXL);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.ajit = ajit;
async function emojiMosaic(context, args) {
    const { target, scale } = args;
    const image = await exports.instance.emojiMosaic([target], args["group-size"], scale);
    const embed = await Embed.image(context, image, "emoji-mosaic.png", constants_1.Brand.PXL);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.emojiMosaic = emojiMosaic;
async function eyes(context, args) {
    const { target, type } = args;
    const image = await exports.instance.eyes([target], type);
    const embed = await Embed.image(context, image, `eyes-${type}.png`, constants_1.Brand.PXL);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.eyes = eyes;
async function flag(context, args) {
    const { target, flag, opacity } = args;
    const image = await exports.instance.flag([target], flag, opacity);
    const embed = await Embed.image(context, image, `flag-${flag}.png`, constants_1.Brand.PXL);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.flag = flag;
async function glitch(context, args) {
    const { target, iterations, amount } = args;
    const image = await exports.instance.glitch([target], iterations, amount, {
        count: args["gif-count"],
        delay: args["gif-delay"],
    });
    const embed = await Embed.image(context, image, "glitch.gif", constants_1.Brand.PXL);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.glitch = glitch;
async function imageSearch(context, args) {
    const { query } = args;
    const data = await exports.instance.imageSearch(query, pariah_1.APIs.PxlAPI.SafeSearch.STRICT, true);
    const paginator = new paginator_1.Paginator(context, {
        pageLimit: data.length,
        onPage: async (page) => {
            const image = data[page - 1];
            const embed = await Embed.image(context, image.url, "image-search.png", constants_1.Brand.PXL);
            embed.setDescription(markdown_1.Markdown.Format.link(image.title, image.location).toString());
            return embed;
        },
    });
    return await paginator.start();
}
exports.imageSearch = imageSearch;
async function jpeg(context, args) {
    const { target, quality } = args;
    const image = await exports.instance.jpeg([target], quality);
    const embed = await Embed.image(context, image, "jpeg.png", constants_1.Brand.PXL);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.jpeg = jpeg;
async function lego(context, args) {
    const { target, scale } = args;
    const image = await exports.instance.lego([target], args["group-size"], scale);
    const embed = await Embed.image(context, image, "lego.png", constants_1.Brand.PXL);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.lego = lego;
async function screenshot(context, args) {
    const { url, browser, locale, theme } = args;
    const image = await exports.instance.screenshot(url.toString(), {
        browser,
        locale,
        theme,
        fullPage: args["full-page"],
    });
    const embed = await Embed.image(context, image, "screenshot.png", constants_1.Brand.PXL);
    embed.setDescription(`URL: ${url.toString()}`);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.screenshot = screenshot;
async function snapchat(context, args) {
    const { target, filter } = args;
    const image = await exports.instance.snapchat([target], filter);
    const embed = await Embed.image(context, image, "snapchat.png", constants_1.Brand.PXL);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.snapchat = snapchat;
async function sonic(context, args) {
    const { text } = args;
    const image = await exports.instance.sonic(text);
    const embed = await Embed.image(context, image, "sonic.png", constants_1.Brand.PXL);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.sonic = sonic;
async function thonkify(context, args) {
    const { text } = args;
    const image = await exports.instance.thonkify(text);
    const embed = await Embed.image(context, image, "thonkify.png", constants_1.Brand.PXL);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.thonkify = thonkify;
async function webSearch(context, args) {
    const { query } = args;
    const data = await exports.instance.webSearch(query, pariah_1.APIs.PxlAPI.SafeSearch.STRICT);
    const paginator = new paginator_1.Paginator(context, {
        pageLimit: data.results.length,
        onPage: async (page) => {
            const result = data.results[page - 1];
            const embed = Embed.brand(context, constants_1.Brand.PXL);
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
exports.webSearch = webSearch;
