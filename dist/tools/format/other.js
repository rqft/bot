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
exports.graph = exports.invite = exports.helpAutocomplete = exports.help = exports.ping = exports.stats = exports.kwanzi = exports.exec = exports.code = void 0;
const Process = __importStar(require("node:child_process"));
const basecommand_1 = require("../../commands/prefixed/basecommand");
const globals_1 = require("../../globals");
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const paginator_1 = require("../paginator");
const tools_1 = require("../tools");
const basic_1 = require("./basic");
const embed_1 = require("./embed");
const image_1 = require("./image");
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
async function ping(context) {
    const ts = "message" in context
        ? context.message.createdAtUnix || context.message.editedAtUnix
        : context.interaction.createdAtUnix;
    return await (0, tools_1.editOrReply)(context, `${Date.now() - ts}ms`);
}
exports.ping = ping;
async function help(context, args) {
    const { query } = args;
    if (context.commandClient) {
        let commands = context.commandClient.commands;
        if (query) {
            commands = commands.filter((command) => {
                return command.names.some((name) => {
                    return (name.toLowerCase().startsWith(query.toLowerCase()) ||
                        name.toLowerCase().includes(query.toLowerCase()));
                });
            });
        }
        if (!commands.length) {
            throw new error_1.Err("No commands found", { status: 404 });
        }
        const paginator = new paginator_1.Paginator(context, {
            pageLimit: commands.length,
            onPage(page) {
                const command = commands[page - 1];
                const embed = embed_1.Embed.user(context);
                if (command instanceof basecommand_1.BaseCommand) {
                    embed.setTitle(command.name);
                    if (command.aliases.length) {
                        embed.addField("Aliases", command.aliases.join(", "));
                    }
                    if (command.metadata) {
                        if (command.metadata.description) {
                            embed.setDescription(markdown_1.Markdown.Format.italics(command.metadata.description).toString());
                        }
                        {
                            const description = [];
                            description.push(basic_1.Basic.field("<:IconChannel_Category:798624247122493450>", "Category", command.metadata.category));
                            description.push(basic_1.Basic.field("<:IconChannel_TextNSFW:798624234628579399>", "NSFW", command.metadata.nsfw ? "Yes" : "No"));
                            embed.addField("Information", description.join("\n"));
                        }
                        if (command.metadata.usage) {
                            const description = [];
                            description.push(markdown_1.Markdown.Format.codeblock(command.fullName + " " + command.metadata.usage));
                            if (command.metadata.examples) {
                                if (command.metadata.examples.length) {
                                    description.push(markdown_1.Markdown.Format.codeblock(command.metadata.examples
                                        .map((example) => {
                                        return command.fullName + " " + example;
                                    })
                                        .join("\n")));
                                }
                            }
                            embed.addField("Usage", description.join("\n"));
                        }
                    }
                }
                return embed;
            },
        });
        return await paginator.start();
    }
    throw new error_1.Err("Context does not have a CommandClient attached", {
        status: 500,
    });
}
exports.help = help;
async function helpAutocomplete(context) {
    const query = context.value;
    const cmds = globals_1.commands.commands;
    if (query) {
        const filtered = cmds.filter((command) => {
            return command.names.some((name) => {
                return (name.toLowerCase().startsWith(query.toLowerCase()) ||
                    name.toLowerCase().includes(query.toLowerCase()));
            });
        });
        return await context.respond({
            choices: filtered
                .map((command) => {
                return {
                    name: command.name,
                    value: command.name,
                };
            })
                .slice(0, 25),
        });
    }
    return await context.respond({
        choices: cmds
            .map((command) => {
            return {
                name: command.name,
                value: command.name,
            };
        })
            .slice(0, 25),
    });
}
exports.helpAutocomplete = helpAutocomplete;
async function invite(context) {
    return await (0, tools_1.editOrReply)(context, `<https://bot.clancy.lol/>`);
}
exports.invite = invite;
async function graph(context, args) {
    const { payload: image } = await image_1.Image.instance.graph(args.expr, args.size);
    const embed = await embed_1.Embed.image(context, image, "graph.png");
    return await (0, tools_1.editOrReply)(context, embed);
}
exports.graph = graph;
