"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imagga = void 0;
const pariah_1 = require("pariah");
const constants_1 = require("../../constants");
const secrets_1 = require("../../secrets");
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const paginator_1 = require("../paginator");
const tools_1 = require("../tools");
const embed_1 = require("./embed");
var Imagga;
(function (Imagga) {
    const instance = new pariah_1.APIs.Imagga.API(secrets_1.Secrets.Key.ImaggaAuth);
    async function tags(context, args) {
        const { target } = args;
        const { payload: { result, status }, } = await instance.tags(target);
        if (status.type === "error") {
            throw new error_1.Err(status.text);
        }
        const embed = embed_1.Embed.brand(context, constants_1.Brand.IMAGGA);
        embed.setThumbnail(target);
        const text = (0, tools_1.padCodeBlockFromRows)(result.tags
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, 20)
            .map((x) => [x.tag.en, x.confidence.toPrecision(4) + "%"]), { join: " | " }).join("\n");
        embed.setDescription(markdown_1.Markdown.Format.codeblock(text).toString());
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Imagga.tags = tags;
    function colorsTable(colors) {
        return (0, tools_1.padCodeBlockFromRows)(colors.map((x) => [
            `${x.closest_palette_color} (${x.html_code})`,
            x.percent.toPrecision(4) + "%",
        ]), { join: " | " }).join("\n");
    }
    Imagga.colorsTable = colorsTable;
    async function colors(context, args) {
        const { target } = args;
        const { payload: { result, status }, } = await instance.colors(target, {});
        if (status.type === "error") {
            throw new error_1.Err(status.text);
        }
        const embed = embed_1.Embed.brand(context, constants_1.Brand.IMAGGA);
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
    Imagga.colors = colors;
    async function categories(context, args) {
        const { target } = args;
        const { payload: { result, status }, } = await instance.categories(target, "general_v3");
        if (status.type === "error") {
            throw new error_1.Err(status.text);
        }
        const embed = embed_1.Embed.brand(context, constants_1.Brand.IMAGGA);
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
    Imagga.categories = categories;
    async function readText(context, args) {
        const { target } = args;
        const { payload: { result, status }, } = await instance.readText(target);
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
                const embed = embed_1.Embed.brand(context, constants_1.Brand.IMAGGA);
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
    Imagga.readText = readText;
})(Imagga = exports.Imagga || (exports.Imagga = {}));
