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
exports.guild = void 0;
const constants_1 = require("../../constants");
const markdown_1 = require("../markdown");
const tools_1 = require("../tools");
const Basic = __importStar(require("./basic"));
const Embed = __importStar(require("./embed"));
async function guild(context) {
    const { guild } = context;
    if (!guild) {
        throw new Error("Need to be in a guild");
    }
    const embed = Embed.user(context);
    {
        embed.setTitle(guild.name);
        if (guild.iconUrl) {
            embed.setThumbnail(guild.iconUrl);
        }
        if (guild.bannerUrl) {
            embed.setImage(guild.bannerUrl);
        }
        if (guild.description) {
            embed.setDescription(guild.description);
        }
    }
    {
        const description = [];
        description.push(Basic.field("<:IconGui_RichPresence:798624241351655514>", "ID", markdown_1.Markdown.Format.codestring(guild.id)));
        if (guild.owner) {
            description.push(Basic.field("<:IconGui_OwnerCrown:799657143719952415>", "Owner", `${markdown_1.Markdown.Format.link(guild.owner.tag, guild.owner.jumpLink)} (${guild.owner.mention})`));
        }
        if (guild.region) {
            description.push(Basic.field("<:IconChannel_Voice:798624234732781580>", "Voice Region", constants_1.VoiceRegionsText[guild.region] || guild.region));
        }
        const GuildPublicStatesText = {
            [String(true)]: "Public",
            [String(false)]: "Private",
        };
        description.push(Basic.field("<:IconGui_Discovery:836649540051664936>", "Server Type", GuildPublicStatesText[String(guild.isPublic)]));
        if (description.length) {
            embed.addField("Information", description.join("\n"));
        }
    }
    {
        const description = [];
        if (guild.channels.length) {
            description.push(Basic.field("<:IconChannel_Text:798624246905569323>", "Text Channels", markdown_1.Markdown.Format.codestring(guild.channels.size.toLocaleString())));
        }
    }
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.guild = guild;
