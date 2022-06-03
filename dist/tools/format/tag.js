"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const pariah_1 = require("pariah");
const secrets_1 = require("../../secrets");
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const paginator_1 = require("../paginator");
const tags_1 = require("../tags");
const tools_1 = require("../tools");
const embed_1 = require("./embed");
var Tag;
(function (Tag) {
    Tag.instance = new pariah_1.APIs.Jonathan.API(secrets_1.Secrets.ApiToken);
    async function get(context, args) {
        if (args.key === "") {
            return await (0, tools_1.editOrReply)(context, 'Missing required parameter "key"');
        }
        const { payload: tag } = await Tag.instance.tagGet(args.key);
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
    Tag.get = get;
    async function post(context, args) {
        const { payload: original } = await Tag.instance.tagGet(args.key);
        if (original.status.state === "ok" && original.data === args.value) {
            throw new error_1.Err("tag already has that value");
        }
        const { payload: tag } = await Tag.instance.tagPost(args.key, args.value);
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
    Tag.post = post;
    async function remove(context, args) {
        const { payload: tag } = await Tag.instance.tagDelete(args.key);
        if (tag.status.state === "error") {
            throw new error_1.Err(tag.status.message, { status: tag.status.code });
        }
        return await (0, tools_1.editOrReply)(context, "ok, i deleted that tag :)");
    }
    Tag.remove = remove;
    async function list(context) {
        const { payload: tags } = await Tag.instance.tagList();
        if (tags.status.state === "error") {
            throw new error_1.Err(tags.status.message, { status: tags.status.code });
        }
        const slices = (0, tools_1.groupArray)(tags.data, 100);
        const paginator = new paginator_1.Paginator(context, {
            pageLimit: slices.length,
            onPage(page) {
                const slice = slices[page - 1];
                const embed = embed_1.Embed.user(context);
                embed.setDescription(`Count: ${tags.data.length}\n` +
                    markdown_1.Markdown.Format.codeblock(slice.join(", ")).toString());
                return embed;
            },
        });
        return await paginator.start();
    }
    Tag.list = list;
    async function inspect(context) {
        const { payload: tags } = await Tag.instance.tagInspect();
        if (tags.status.state === "error") {
            throw new error_1.Err(tags.status.message, { status: tags.status.code });
        }
        return await (0, tools_1.editOrReply)(context, {
            files: [
                { value: JSON.stringify(tags.data, null, 2), filename: "data.json" },
            ],
        });
    }
    Tag.inspect = inspect;
    async function search(context) {
        const { payload: tags } = await Tag.instance.tagSearch(context.value);
        if (tags.status.state === "error") {
            return await context.respond({ content: ":(" });
        }
        return await context.respond({ choices: tags.data });
    }
    Tag.search = search;
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
    Tag.exec = exec;
})(Tag = exports.Tag || (exports.Tag = {}));
