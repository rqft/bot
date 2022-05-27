"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.exec = exports.search = exports.inspect = exports.list = exports.remove = exports.post = exports.get = exports.instance = void 0;
const secrets_1 = require("../../secrets");
const api_1 = require("../api");
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const paginator_1 = require("../paginator");
const tags_1 = require("../tags");
const tools_1 = require("../tools");
const Embed = __importStar(require("./embed"));
exports.instance = new api_1.Jonathan.API(secrets_1.Secrets.ApiToken);
async function get(context, args) {
    if (args.key === "") {
        return await (0, tools_1.editOrReply)(context, 'Missing required parameter "key"');
    }
    const { payload: tag } = await exports.instance.tagGet(args.key);
    if (tag.status.state === "error") {
        throw new error_1.Err(tag.status.message, { status: tag.status.code });
    }
    const output = await tags_1.Tags.exec(context, tag.data, args.args);
    if (!output.text) {
        output.text = "\u200b";
    }
    return await (0, tools_1.editOrReply)(context, {
        content: output.text,
        attachments: output.files,
    });
}
exports.get = get;
async function post(context, args) {
    const { payload: original } = await exports.instance.tagGet(args.key);
    if (original.status.state === "ok" && original.data === args.value) {
        throw new error_1.Err("tag already has that value");
    }
    const { payload: tag } = await exports.instance.tagPost(args.key, args.value);
    if (tag.status.state === "error") {
        throw new error_1.Err(tag.status.message, { status: tag.status.code });
    }
    const description = ["ok, i set that tag :D"];
    if (original.data !== null) {
        description.push(`original value: ${markdown_1.Markdown.Format.codeblock(original.data)}`);
    }
    description.push(`new value: ${markdown_1.Markdown.Format.codeblock(args.value)}`);
    return await (0, tools_1.editOrReply)(context, description.join("\n"));
}
exports.post = post;
async function remove(context, args) {
    const { payload: tag } = await exports.instance.tagDelete(args.key);
    if (tag.status.state === "error") {
        throw new error_1.Err(tag.status.message, { status: tag.status.code });
    }
    return await (0, tools_1.editOrReply)(context, "ok, i deleted that tag :)");
}
exports.remove = remove;
async function list(context) {
    const { payload: tags } = await exports.instance.tagList();
    if (tags.status.state === "error") {
        throw new error_1.Err(tags.status.message, { status: tags.status.code });
    }
    const slices = (0, tools_1.groupArray)(tags.data, 100);
    const paginator = new paginator_1.Paginator(context, {
        pageLimit: slices.length,
        onPage(page) {
            const slice = slices[page - 1];
            const embed = Embed.user(context);
            embed.setDescription(`Count: ${tags.data.length}\n` +
                markdown_1.Markdown.Format.codeblock(slice.join(", ")).toString());
            return embed;
        },
    });
    return await paginator.start();
}
exports.list = list;
async function inspect(context) {
    const { payload: tags } = await exports.instance.tagInspect();
    if (tags.status.state === "error") {
        throw new error_1.Err(tags.status.message, { status: tags.status.code });
    }
    return await (0, tools_1.editOrReply)(context, {
        files: [
            { value: JSON.stringify(tags.data, null, 2), filename: "data.json" },
        ],
    });
}
exports.inspect = inspect;
async function search(context) {
    const { payload: tags } = await exports.instance.tagSearch(context.value);
    if (tags.status.state === "error") {
        return await context.respond({ content: ":(" });
    }
    return await context.respond({ choices: tags.data });
}
exports.search = search;
async function exec(context, args) {
    const output = await tags_1.Tags.exec(context, args.script, args.args);
    if (!output.text) {
        output.text = "\u200b";
    }
    return await (0, tools_1.editOrReply)(context, {
        content: output.text,
        attachments: output.files,
    });
}
exports.exec = exec;
