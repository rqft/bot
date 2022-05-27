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
exports.role = void 0;
const constants_1 = require("../../constants");
const emojis_1 = require("../emojis");
const markdown_1 = require("../markdown");
const tools_1 = require("../tools");
const Basic = __importStar(require("./basic"));
const basic_1 = require("./basic");
const Embed = __importStar(require("./embed"));
const Image = __importStar(require("./image"));
async function role(context, args) {
    const { role } = args;
    if (!role) {
        throw new Error("unknown role");
    }
    const embed = Embed.user(context);
    embed.setTitle(role.name);
    {
        let url;
        if (role.color) {
            console.log(role.color);
            const data = await Image.instance.imageColor(512, role.color.toString(16));
            const attach = await (0, tools_1.store)(data, "color.png");
            console.log(attach.url);
            url = attach.url;
        }
        embed.setThumbnail(url);
    }
    {
        const description = [];
        description.push(Basic.field("<:IconGui_RichPresence:798624241351655514>", "ID", markdown_1.Markdown.Format.codestring(role.id)));
        if (role.color) {
            description.push(Basic.field("<:IconGui_AddFile:799643046614007838>", "Color", `\`#${role.color.toString(16)}\``));
        }
        else {
            description.push(Basic.field("<:IconGui_AddFile:799643046614007838>", "Color", "None"));
        }
        if (role.unicodeEmoji) {
            description.push(Basic.field("<:IconGui_Emoji:837055568338223165>", "Emoji", markdown_1.Markdown.Format.codestring(role.unicodeEmoji)));
        }
        if (role.createdAtUnix) {
            description.push(Basic.field(emojis_1.Emojis.CALENDAR, "Created At", (0, tools_1.buildTimestampString)(role.createdAtUnix)));
        }
        description.push(Basic.field("<:IconGui_Members:798624241868079104>", "Members", role.members.size.toLocaleString()));
        {
            const tags = [];
            if (role.tags) {
                if (role.tags.premiumSubscriber) {
                    tags.push("Premium Role");
                }
            }
            if (role.hoist) {
                tags.push("Hoisted");
            }
            if (role.isBoosterRole) {
                tags.push("Booster Role");
            }
            if (role.isDefault) {
                tags.push("Default Role");
            }
            if (role.managed) {
                tags.push("Managed");
            }
            if (role.mentionable) {
                tags.push("Mentionable");
            }
            if (tags.length) {
                description.push(Basic.field("<:IconChannel_Str:798624234745757727>", "Tags", tags.map((x) => markdown_1.Markdown.Format.codestring(x)).join(", ")));
            }
        }
        if (role.integrationId) {
            description.push(Basic.field("<:IconGui_AddFile:799643046614007838>", "Integration ID", markdown_1.Markdown.Format.codestring(role.integrationId)));
        }
        if (role.botId) {
            description.push(Basic.field("<:IconGui_Discovery:836649540051664936>", "Bot ID", markdown_1.Markdown.Format.codestring(role.botId)));
        }
        if (role.guild) {
            description.push(Basic.field(emojis_1.Emojis.SHIELD, "Server", `${markdown_1.Markdown.Format.link(role.guild.name, role.guild.jumpLink)} (${markdown_1.Markdown.Format.codestring(role.guild.id)})`));
        }
        embed.addField("Info", description.join("\n"), true);
    }
    {
        const permissions = (0, basic_1.permissionsList)(role);
        if (permissions.length) {
            embed.addField("Permissions", permissions.map((x) => constants_1.PermissionsText[String(x)]).join(", "));
        }
    }
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.role = role;
