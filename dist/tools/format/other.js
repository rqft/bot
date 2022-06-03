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
exports.ping = exports.urban = exports.UrbanInstance = exports.definitions = exports.define = exports.DictionaryInstance = exports.stats = exports.kwanzi = exports.exec = exports.code = void 0;
const Process = __importStar(require("node:child_process"));
const pariah_1 = require("pariah");
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const paginator_1 = require("../paginator");
const tools_1 = require("../tools");
const embed_1 = require("./embed");
async function code(context, args) {
    if (!context.client.isOwner(context.userId)) {
        throw new error_1.Err("no", { status: 403 });
    }
    const text = args.code;
    let language = "ts";
    let message;
    try {
        message = await Promise.resolve(eval(text));
        if (typeof message === "object") {
            message = JSON.stringify(message, null, args["json-spacing"]);
            language = "json";
        }
    }
    catch (error) {
        message =
            error instanceof Error
                ? error.stack || error.message
                : error instanceof error_1.Err
                    ? error.toString()
                    : error;
    }
    message = String(message);
    return await (0, tools_1.editOrReply)(context, markdown_1.Markdown.Format.codeblock(message, language).toString());
}
exports.code = code;
async function exec(context, args) {
    if (!context.client.isOwner(context.userId)) {
        throw new error_1.Err("no", { status: 403 });
    }
    const text = args.code;
    let message = "";
    try {
        const data = Process.execSync(text);
        message = data.toString("utf-8");
    }
    catch (error) {
        message = error.message;
    }
    return await (0, tools_1.editOrReply)(context, markdown_1.Markdown.Format.codeblock(message).toString());
}
exports.exec = exec;
async function kwanzi(context, args) {
    const { text: payload } = args;
    const list = Array.from(new Set(payload.toLowerCase().split(" ")));
    const hit = [];
    const output = [];
    while (hit.length < list.length) {
        const index = Math.floor(Math.random() * list.length);
        const item = list[index];
        output.push(item);
        if (hit.includes(item)) {
            continue;
        }
        hit.push(item);
        if (Math.random() > 0.7) {
            list.splice(index, 1);
        }
    }
    return await (0, tools_1.editOrReply)(context, output.join(" "));
}
exports.kwanzi = kwanzi;
async function stats(context) {
    const embed = embed_1.Embed.user(context);
    if (embed) {
        void 0;
    }
}
exports.stats = stats;
exports.DictionaryInstance = new pariah_1.APIs.Dictionary.API(2, "en");
async function define(context, args) {
    const { word } = args;
    const { payload, status } = await exports.DictionaryInstance.entries(word);
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
                const fields = (0, tools_1.splitToFields)(description.join("\n"), "Definitions", 512);
                for (const field of fields) {
                    embed.addField(field.name, field.value, true);
                }
            }
            return embed;
        },
    });
    return await paginator.start();
}
exports.define = define;
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
        choices: Array.from(words).map((x) => ({ name: (0, tools_1.toTitleCase)(x), value: x })),
    });
}
exports.definitions = definitions;
exports.UrbanInstance = new pariah_1.APIs.Urban.API();
async function urban(context, args) {
    const { word } = args;
    const { payload } = await exports.UrbanInstance.define(word);
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
exports.urban = urban;
function fixUrbanLinks(data) {
    return data.replace(/\[(.+?)\]/g, (_, g1) => `[${g1}](https://www.urbandictionary.com/define.php?term=${encodeURIComponent(g1)})`);
}
async function ping(context) {
    const ts = "message" in context
        ? context.message.createdAtUnix || context.message.editedAtUnix
        : context.interaction.createdAtUnix;
    return await (0, tools_1.editOrReply)(context, `${Date.now() - ts}ms`);
}
exports.ping = ping;
