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
exports.kwanzi = exports.exec = exports.code = void 0;
const Process = __importStar(require("node:child_process"));
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const tools_1 = require("../tools");
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
        message = data.toString('utf-8');
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
