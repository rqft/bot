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
exports.readText = exports.categories = exports.colors = exports.tags = void 0;
const pariah_1 = require("pariah");
const constants_1 = require("../../constants");
const secrets_1 = require("../../secrets");
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const paginator_1 = require("../paginator");
const tools_1 = require("../tools");
const Embed = __importStar(require("./embed"));
const instance = new pariah_1.APIs.Imagga.API(secrets_1.Secrets.Key.ImaggaAuth);
async function tags(context, args) {
    const { target } = args;
    const { result, status } = await instance.tags(target);
    if (status.type === "error") {
        throw new error_1.Err(status.text);
    }
    const embed = Embed.brand(context, constants_1.Brand.IMAGGA);
    embed.setThumbnail(target);
    const text = (0, tools_1.padCodeBlockFromRows)(result.tags
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 20)
        .map((x) => [x.tag.en, x.confidence.toPrecision(4) + "%"]), { join: " | " }).join("\n");
    embed.setDescription(markdown_1.Markdown.Format.codeblock(text).toString());
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.tags = tags;
function colorsTable(colors) {
    return (0, tools_1.padCodeBlockFromRows)(colors.map((x) => [
        `${x.closest_palette_color} (${x.html_code})`,
        x.percent.toPrecision(4) + "%",
    ]), { join: " | " }).join("\n");
}
async function colors(context, args) {
    const { target } = args;
    const { result, status } = await instance.colors(target, {});
    if (status.type === "error") {
        throw new error_1.Err(status.text);
    }
    const embed = Embed.brand(context, constants_1.Brand.IMAGGA);
    embed.setThumbnail(target);
    {
        embed.addField("Colour Variance", result.colors.color_variance.toLocaleString(), true);
        embed.addField("Colour Percent Threshold", result.colors.color_percent_threshold.toLocaleString(), true);
        embed.addField("Object Percentage", result.colors.object_percentage.toLocaleString(), true);
    }
    {
        const text = colorsTable(result.colors.background_colors);
        embed.addField("Background Colors", markdown_1.Markdown.Format.codeblock(text).toString());
    }
    {
        const text = colorsTable(result.colors.foreground_colors);
        embed.addField("Foreground Colors", markdown_1.Markdown.Format.codeblock(text).toString());
    }
    {
        const text = colorsTable(result.colors.image_colors);
        embed.addField("Image Colors", markdown_1.Markdown.Format.codeblock(text).toString());
    }
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.colors = colors;
async function categories(context, args) {
    const { target } = args;
    const { result, status } = await instance.categories(target, "general_v3");
    if (status.type === "error") {
        throw new error_1.Err(status.text);
    }
    const embed = Embed.brand(context, constants_1.Brand.IMAGGA);
    embed.setThumbnail(target);
    {
        const text = (0, tools_1.padCodeBlockFromRows)(result.categories.map((x) => [
            x.name.en.replace(/\.n\.\d+/g, "").replace(/_/g, " "),
            x.confidence.toPrecision(4) + "%",
        ]), { join: " | " }).join("\n");
        embed.setDescription(markdown_1.Markdown.Format.codeblock(text).toString());
    }
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.categories = categories;
async function readText(context, args) {
    const { target } = args;
    const { result, status } = await instance.readText(target);
    if (status.type === "error") {
        throw new error_1.Err(status.text);
    }
    if (!result.text.length) {
        throw new error_1.Err("No text found", { status: 404 });
    }
    const paginator = new paginator_1.Paginator(context, {
        pageLimit: result.text.length,
        onPage: (page) => {
            const { coordinates, data } = result.text[page - 1];
            const embed = Embed.brand(context, constants_1.Brand.IMAGGA);
            embed.setThumbnail(target);
            const width = coordinates.xmax - coordinates.xmin;
            const height = coordinates.ymax - coordinates.ymin;
            embed.setDescription(`Page ${page}/${result.text.length}`);
            embed.addField(`Location: (${coordinates.xmin}, ${coordinates.ymin})`, `Size: ${width}x${height}\n` +
                markdown_1.Markdown.Format.codeblock(data).toString());
            return embed;
        },
    });
    return await paginator.start();
}
exports.readText = readText;
