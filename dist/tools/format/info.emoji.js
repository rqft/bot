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
exports.emoji = void 0;
const globals_1 = require("../../globals");
const secrets_1 = require("../../secrets");
const api_emojis_1 = require("../api.emojis");
const emojis_1 = require("../emojis");
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const parameters_1 = require("../parameters");
const tools_1 = require("../tools");
const Basic = __importStar(require("./basic"));
const Embed = __importStar(require("./embed"));
async function emoji(context, args) {
    const { emoji } = args;
    const embed = Embed.user(context);
    embed.setThumbnail(emoji.url);
    switch (emoji.type) {
        case parameters_1.Parameters.EmojiType.TWEMOJI: {
            const instance = new api_emojis_1.EmojiData.API(secrets_1.Secrets.Key.EmojiData);
            console.log(emoji.raw);
            const data = await instance.searchBy("codePoint", emoji.raw.toUpperCase().split("-").join(" "));
            if (!data) {
                throw new error_1.Err("No emoji data found for that unicode emoji");
            }
            embed.setTitle(data.unicodeName);
            {
                const description = [];
                description.push(Basic.field("<:IconGui_RichPresence:798624241351655514>", "Slug", markdown_1.Markdown.Format.codestring(data.slug)));
                description.push(Basic.field("<:IconGui_AddFile:799643046614007838>", "Code Point", markdown_1.Markdown.Format.codestring(data.codePoint)));
                description.push(Basic.field("<:IconChannel_Category:798624247122493450>", "Group", markdown_1.Markdown.Format.codestring(data.group)));
                description.push(Basic.field("<:blank:835277151031787541>", "-> Sub Group", markdown_1.Markdown.Format.codestring(data.subGroup)));
                if (description.length) {
                    embed.addField("Info", description.join("\n"), true);
                }
            }
            break;
        }
        case parameters_1.Parameters.EmojiType.CUSTOM: {
            const data = [context.client, globals_1.selfclient]
                .map((x) => x.emojis.toArray())
                .flat()
                .find((x) => x.id === emoji.id);
            if (!data) {
                throw new error_1.Err("No emoji data found for that custom emoji");
            }
            embed.setTitle(data.name);
            {
                const description = [];
                description.push(Basic.field("<:IconGui_RichPresence:798624241351655514>", "ID", markdown_1.Markdown.Format.codestring(data.id)));
                if (data.createdAtUnix) {
                    description.push(Basic.field(emojis_1.Emojis.CALENDAR, "Created At", (0, tools_1.buildTimestampString)(data.createdAtUnix)));
                }
                if (data.user) {
                    description.push(Basic.field("<:IconGui_Discovery:836649540051664936>", "Created By", `${markdown_1.Markdown.Format.link(data.user.tag, data.user.jumpLink)} (${data.user.mention})`));
                }
                {
                    const tags = [];
                    if (data.managed) {
                        tags.push("Managed");
                    }
                    if (data.animated) {
                        tags.push("Animated");
                    }
                    if (data.requireColons) {
                        tags.push("Requires Colons");
                    }
                    if (tags.length) {
                        description.push(Basic.field("<:IconChannel_Str:798624234745757727>", "Tags", tags.map((x) => markdown_1.Markdown.Format.codestring(x)).join(", ")));
                    }
                }
                if (data.roles.size) {
                    description.push(Basic.field("<:IconGui_Role:816328284245196840>", "Roles", data.roles.map((x) => x.mention).join(", ")));
                }
                if (data.guild) {
                    description.push(Basic.field(emojis_1.Emojis.SHIELD, "Server", `${markdown_1.Markdown.Format.link(data.guild.name, data.guild.jumpLink)} (${markdown_1.Markdown.Format.codestring(data.guild.id)})`));
                }
                if (description.length) {
                    embed.addField("Info", description.join("\n"), true);
                }
            }
        }
    }
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.emoji = emoji;
