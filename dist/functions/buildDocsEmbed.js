"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDocsEmbed = exports.lookup = void 0;
const discord_js_1 = require("discord.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const globals_1 = require("../globals");
const IPylonDocs_1 = require("../interfaces/IPylonDocs");
const url = "https://4iuxqlhenh-dsn.algolia.net/1/indexes/*/queries?x-algolia-api-key=4cfe00690d1880ca0e048c58a88dfd1a&x-algolia-application-id=4IUXQLHENH";
async function lookup(query, page) {
    const request = await node_fetch_1.default(url, {
        method: "POST",
        body: JSON.stringify({
            requests: [
                {
                    indexName: "pylon-docs-prod",
                    params: "query=" + encodeURIComponent(query) + "&page=" + (page || 0),
                },
            ],
        }),
    });
    return request.json();
}
exports.lookup = lookup;
function buildDocsEmbed(data, maxResults = 10) {
    const [result] = data.results;
    const desc = result.hits
        .slice(0, maxResults)
        .map((x) => {
        const text = x.path.replace(new RegExp(result.query, "gi"), "**$&**");
        return `${IPylonDocs_1.Kind[x.kind]}[${text.slice(0, 50)}${text.length > 10 ? "..." : ""}](${x.url})`;
    })
        .join("\n")
        .replace(/_/g, "\\$&") ?? "⛔ No results found.";
    return new discord_js_1.MessageEmbed()
        .setTitle(`:mag: Search results for: ${result.query} | Page ${result.page + 1}`)
        .setColor(globals_1.Color.pylon)
        .setDescription(desc)
        .setFooter(`Processing time: ${result.processingTimeMS}ms ${result.hits.length > maxResults
        ? `| ${result.hits.length - maxResults} results not shown`
        : ""}`)
        .setThumbnail("https://cdn.discordapp.com/emojis/648961590527524874.png?v=1");
}
exports.buildDocsEmbed = buildDocsEmbed;
