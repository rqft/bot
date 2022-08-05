"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guild = void 0;
const constants_1 = require("detritus-client/lib/constants");
const constants_2 = require("../../constants");
const emojis_1 = require("../emojis");
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const tools_1 = require("../tools");
const basic_1 = require("./basic");
const embed_1 = require("./embed");
async function guild(context, args) {
    const guild = args.guild || context.guild;
    if (!guild) {
        throw new error_1.Err("Need to be in a server", { status: 403 });
    }
    const embed = embed_1.Embed.user(context);
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
        description.push(basic_1.Basic.field("<:IconGui_RichPresence:798624241351655514>", "ID", markdown_1.Markdown.Format.codestring(guild.id)));
        description.push(basic_1.Basic.field(emojis_1.Emojis.CALENDAR, "Created At", markdown_1.Markdown.Format.timestamp(guild.createdAt)));
        if (guild.owner) {
            description.push(basic_1.Basic.field("<:IconGui_OwnerCrown:799657143719952415>", "Owner", `${markdown_1.Markdown.Format.link(guild.owner.tag, guild.owner.jumpLink)} (${guild.owner.mention})`));
        }
        if (guild.region) {
            description.push(basic_1.Basic.field("<:IconChannel_Voice:798624234732781580>", "Voice Region", constants_2.VoiceRegionsText[guild.region] || guild.region));
        }
        if (description.length) {
            embed.addField("Information", description.join("\n"), true);
        }
        {
            const description = [];
            description.push(basic_1.Basic.field("\n" + "<:IconGui_Role:816328284245196840>", "MFA Level", constants_2.GuildMfaLevelsText[guild.mfaLevel] || "Unknown"));
            description.push(basic_1.Basic.field("<:IconChannel_TextNSFW:798624234628579399>", "Explicit Content Filter", constants_2.GuildExplicitContentFiltersText[guild.explicitContentFilter] ||
                "Unknown"));
            description.push(basic_1.Basic.field("<:IconGui_Invite:798624241347198987>", "Verification Level", constants_2.GuildVerificationLevelsText[guild.verificationLevel] || "Unknown"));
            if (guild.canHaveVanityUrl) {
                description.push(basic_1.Basic.field("<:IconGui_Invite:798624241347198987>", "Vanity URL", guild.vanityUrlCode || "Not Set"));
            }
            description.push(basic_1.Basic.field("<:IconGui_Discovery:836649540051664936>", "Server Type", constants_2.GuildPublicStatesText[String(guild.isPublic)]));
            description.push(basic_1.Basic.field("<:IconGui_Settings:798624241402511420>", "Locale", guild.preferredLocaleText || "Unknown"));
            if (description.length) {
                embed.addField("\u200b", description.join("\n"), true);
            }
        }
    }
    {
        const description = [];
        if (guild.channels.size) {
            description.push(basic_1.Basic.field("<:IconChannel_Thread:836610428570173472>", "Channels", guild.channels.size.toLocaleString()));
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
                description.push(basic_1.Basic.field("<:blank:835277151031787541>", `${ChannelTypeEmojis[key]} ${constants_2.ChannelTypesText[key]}`, value.toLocaleString()));
            }
        }
        if (guild.roles.size) {
            description.push(basic_1.Basic.field("\n" + "<:IconGui_Role:816328284245196840>", "Roles", guild.roles.size.toLocaleString()));
        }
        if (guild.memberCount) {
            description.push(basic_1.Basic.field("<:IconGui_Members:798624241868079104>", "Members", guild.memberCount.toLocaleString()));
        }
        if (guild.premiumSubscriptionCount) {
            description.push(basic_1.Basic.field("<:IconGui_BoostLevel_1:837059220075446353>", "Boosts", guild.premiumSubscriptionCount.toLocaleString()));
        }
        if (guild.emojis.size) {
            description.push(basic_1.Basic.field("<:IconGui_Emoji:837055568338223165>", "Emojis", guild.emojis.size.toLocaleString()));
        }
        if (guild.stickers.size) {
            description.push(basic_1.Basic.field("<:IconGui_Sticker:979381227293401088>", "Stickers", guild.stickers.size.toLocaleString()));
        }
        if (guild.guildScheduledEvents.size) {
            description.push(basic_1.Basic.field("<:IconGui_Slowmode:798624247337058354>", "Scheduled Events", guild.guildScheduledEvents.size.toLocaleString()));
        }
        if (guild.presences.size) {
            description.push(basic_1.Basic.field("<:IconGui_RichPresence:798624241351655514>", "Presences", guild.presences.size.toLocaleString()));
        }
        if (guild.stageInstances.size) {
            description.push(basic_1.Basic.field("<:IconChannel_Stage:836613501618487326>", "Stage Instances", guild.stageInstances.size.toLocaleString()));
        }
        if (guild.voiceStates.size) {
            description.push(basic_1.Basic.field("<:IconChannel_Voice:798624234732781580>", "Voice States", guild.voiceStates.size.toLocaleString()));
        }
        if (description.length) {
            embed.addField("Counts", description.join("\n"), true);
        }
    }
    {
        const txt = guild.features.map((value) => {
            const emoji = constants_2.GuildFeaturesEmojis[value];
            const text = constants_2.GuildFeaturesText[value];
            return `${emoji} ${text}`;
        });
        if (txt.length > 10) {
            for (let i = 0; i < 3; i++) {
                const d = txt.splice(0, 10);
                console.log(i, d);
                if (d.length) {
                    embed.addField(i === 0 ? "Features" : "\u200b", d.join("\n"), true);
                }
            }
        }
    }
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.guild = guild;
