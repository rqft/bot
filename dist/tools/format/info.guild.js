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
exports.guild = void 0;
const constants_1 = require("detritus-client/lib/constants");
const constants_2 = require("../../constants");
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
            description.push(Basic.field("<:IconChannel_Voice:798624234732781580>", "Voice Region", constants_2.VoiceRegionsText[guild.region] || guild.region));
        }
        description.push(Basic.field("<:IconGui_Discovery:836649540051664936>", "Server Type", constants_2.GuildPublicStatesText[String(guild.isPublic)]));
        description.push(Basic.field("<:IconGui_Settings:798624241402511420>", "Locale", guild.preferredLocaleText || "Unknown"));
        description.push(Basic.field("\n" + "<:IconGui_Role:816328284245196840>", "MFA Level", constants_2.GuildMfaLevelsText[guild.mfaLevel] || "Unknown"));
        description.push(Basic.field("<:IconChannel_TextNSFW:798624234628579399>", "Explicit Content Filter", constants_2.GuildExplicitContentFiltersText[guild.explicitContentFilter] ||
            "Unknown"));
        description.push(Basic.field("<:IconGui_Invite:798624241347198987>", "Verification Level", constants_2.GuildVerificationLevelsText[guild.verificationLevel] || "Unknown"));
        if (guild.canHaveVanityUrl) {
            description.push(Basic.field("<:IconGui_Invite:798624241347198987>", "Vanity URL", guild.vanityUrlCode || "Not Set"));
        }
        if (description.length) {
            embed.addField("Information", description.join("\n"), true);
        }
    }
    {
        const description = [];
        if (guild.channels.size) {
            description.push(Basic.field("<:IconChannel_Thread:836610428570173472>", "Channels", guild.channels.size.toLocaleString()));
            const count = new Map();
            for (const [, channel] of guild.channels) {
                count.set(channel.type, (count.get(channel.type) || 0) + 1);
            }
            const ChannelTypeEmojis = {
                [constants_1.ChannelTypes.BASE]: "<:IconChannel_Thread:836610428570173472>",
                [constants_1.ChannelTypes.DM]: "<:IconChannel_Text:798624246905569323>",
                [constants_1.ChannelTypes.GROUP_DM]: "<:IconGui_Members:798624241868079104>",
                [constants_1.ChannelTypes.GUILD_CATEGORY]: "<:IconChannel_Category:798624247122493450>",
                [constants_1.ChannelTypes.GUILD_DIRECTORY]: "<:IconChannel_Category:798624247122493450>",
                [constants_1.ChannelTypes.GUILD_FORUM]: "<:IconChannel_Thread:836610428570173472>",
                [constants_1.ChannelTypes.GUILD_NEWS]: "<:IconChannel_News:798624238793261109>",
                [constants_1.ChannelTypes.GUILD_NEWS_THREAD]: "<:IconChannel_ThreadNew:836610449201037413>",
                [constants_1.ChannelTypes.GUILD_PRIVATE_THREAD]: "<:IconChannel_ThreadNew:836610449201037413>",
                [constants_1.ChannelTypes.GUILD_PUBLIC_THREAD]: "<:IconChannel_ThreadNew:836610449201037413>",
                [constants_1.ChannelTypes.GUILD_STAGE_VOICE]: "<:IconChannel_Stage:836613501618487326>",
                [constants_1.ChannelTypes.GUILD_STORE]: "<:IconChannel_Str:798624234745757727>",
                [constants_1.ChannelTypes.GUILD_TEXT]: "<:IconChannel_Text:798624246905569323>",
                [constants_1.ChannelTypes.GUILD_VOICE]: "<:IconChannel_Voice:798624234732781580>",
            };
            for (const [key, value] of count) {
                description.push(Basic.field("<:blank:835277151031787541>", `${ChannelTypeEmojis[key]} ${constants_2.ChannelTypesText[key]}`, value.toLocaleString()));
            }
        }
        if (guild.roles.size) {
            description.push(Basic.field("\n" + "<:IconGui_Role:816328284245196840>", "Roles", guild.roles.size.toLocaleString()));
        }
        if (guild.members.size) {
            description.push(Basic.field("<:IconGui_Members:798624241868079104>", "Members", guild.members.size.toLocaleString()));
        }
        if (guild.premiumSubscriptionCount) {
            description.push(Basic.field("<:IconBadge_Nitro:798624232472051792>", "Boosts", guild.premiumSubscriptionCount.toLocaleString()));
        }
        if (guild.emojis.size) {
            description.push(Basic.field("<:IconGui_Emoji:837055568338223165>", "Emojis", guild.emojis.size.toLocaleString()));
        }
        if (guild.stickers.size) {
            description.push(Basic.field("<:IconGui_Sticker:979381227293401088>", "Stickers", guild.stickers.size.toLocaleString()));
        }
        if (guild.guildScheduledEvents.size) {
            description.push(Basic.field("<:IconGui_Slowmode:798624247337058354>", "Scheduled Events", guild.guildScheduledEvents.size.toLocaleString()));
        }
        if (guild.presences.size) {
            description.push(Basic.field("<:IconGui_RichPresence:798624241351655514>", "Presences", guild.presences.size.toLocaleString()));
        }
        if (guild.stageInstances.size) {
            description.push(Basic.field("<:IconChannel_Stage:836613501618487326>", "Stage Instances", guild.stageInstances.size.toLocaleString()));
        }
        if (guild.voiceStates.size) {
            description.push(Basic.field("<:IconChannel_Voice:798624234732781580>", "Voice States", guild.voiceStates.size.toLocaleString()));
        }
        if (description.length) {
            embed.addField("Counts", description.join("\n"), true);
        }
    }
    {
        const featuresText = guild.features
            .map((feature) => `${constants_2.GuildFeaturesEmojis[feature] || "<:blank:835277151031787541>"} ${markdown_1.Markdown.Format.codestring(constants_2.GuildFeaturesText[feature] || feature)}`)
            .join("\n");
        if (featuresText.length) {
            embed.addField("Features", featuresText, false);
        }
    }
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.guild = guild;
