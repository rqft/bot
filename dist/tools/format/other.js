"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kwanzi = exports.code = void 0;
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const tools_1 = require("../tools");
async function code(context, args) {
    if (!context.client.isOwner(context.userId)) {
        throw new error_1.Err("no", { status: 403 });
    }
    const text = args.code.text;
    let language = args.code.language || "ts";
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
