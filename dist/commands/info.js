"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = exports.guild = exports.user = exports.channel = exports.role = exports.customEmoji = exports.unicodeEmoji = exports.snowflake = exports.isSnowflake = exports.identify = void 0;
const constants_1 = require("detritus-client/lib/constants");
const structures_1 = require("detritus-client/lib/structures");
const utils_1 = require("detritus-client/lib/utils");
const constants_2 = require("../constants");
const embed_1 = require("../tools/embed");
const emoji_1 = require("../tools/emoji");
const markdown_1 = require("../tools/markdown");
const paginator_1 = require("../tools/paginator");
const util_1 = require("../tools/util");
const warning_1 = require("../tools/warning");
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)("info [...noun?]", { args: (self) => ({ noun: self.stringOptional() }) }, async (context, args) => {
    const { noun } = args;
    const pages = noun
        ? identify(context, noun)
        : [
            context.member || context.user,
            context.guild,
            context.channel,
            context.message,
        ].filter((x) => x !== null);
    if (!pages.length) {
        throw new warning_1.Warning("Nothing was found");
    }
    const paginator = new paginator_1.Paginator(context, {
        pageLimit: pages.length,
        async onPage(page) {
            const embed = embed_1.Embeds.user(context);
            const data = pages[page - 1];
            if (isSnowflake(data)) {
                return await snowflake(context, data, embed);
            }
            if (data instanceof emoji_1.UnicodeEmoji) {
                return await unicodeEmoji(context, data, embed);
            }
            if (data instanceof emoji_1.CustomEmoji) {
                return await customEmoji(context, data, embed);
            }
            if (data instanceof structures_1.Role) {
                return await role(context, data, embed);
            }
            if (data instanceof structures_1.ChannelBase) {
                return await channel(context, data, embed);
            }
            if (data instanceof structures_1.Message) {
                return await message(context, data, embed);
            }
            if (data instanceof structures_1.Guild) {
                return await guild(context, data, embed);
            }
            if (data instanceof structures_1.User || data instanceof structures_1.Member) {
                return await user(context, data, embed);
            }
            embed.setDescription("No further details.");
            return embed;
        },
    });
    return await paginator.start();
});
function identify(context, noun) {
    const out = [];
    if (/^<a?:(\w{2,32}):(\d{16,20})>$/.test(noun)) {
        out.push(new emoji_1.CustomEmoji(noun));
    }
    const cemoji = context.client.emojis.filter((x) => x.name.toLowerCase() === noun.toLowerCase() ||
        x.id === noun.replace(/\D/g, ""));
    if (cemoji.length) {
        out.push(...cemoji.map((x) => new emoji_1.CustomEmoji(x.format)));
    }
    const uemoji = constants_2.emojis.filter((x) => x.name.toLowerCase() === noun.toLowerCase() || x.emoji === noun);
    if (uemoji.length) {
        out.push(...uemoji.map((x) => new emoji_1.UnicodeEmoji(x.emoji)));
    }
    const user = context.client.users.find((x) => x.tag.toLowerCase() === noun.toLowerCase() ||
        x.id === noun.replace(/\D/g, "") ||
        x.jumpLink === noun);
    a: if (user) {
        if (context.guild) {
            if (context.guild.members.has(user.id)) {
                out.push(context.guild.members.get(user.id));
                break a;
            }
        }
        out.push(user);
    }
    const channels = context.client.channels.filter((x) => x.id === noun.replace(/\D/g, "") ||
        x.name.toLowerCase() === noun.toLowerCase() ||
        x.jumpLink === noun);
    if (channels.length) {
        out.push(...channels);
    }
    const roles = context.client.roles.filter((x) => x.id === noun.replace(/\D/g, "") ||
        (x.id === context.guildId && noun === "@everyone") ||
        x.name.toLowerCase() === noun.toLowerCase());
    if (roles.length) {
        out.push(...roles);
    }
    const guilds = context.client.guilds.filter((x) => x.id === noun.replace(/\D/g, "") ||
        x.name.toLowerCase() === noun.toLowerCase() ||
        x.jumpLink === noun);
    if (guilds.length) {
        out.push(...guilds);
    }
    const messages = context.client.messages.filter((x) => x.id === noun.replace(/\D/g, "") ||
        x.id === context.message.referencedMessage?.id ||
        x.jumpLink === noun);
    if (messages.length) {
        out.push(...messages);
    }
    if (/^\d{16,21}$/g.test(noun)) {
        out.push(Object.assign(utils_1.Snowflake.deconstruct(noun), {
            species: "@data/snowflake",
        }));
    }
    console.log(out);
    return out;
}
exports.identify = identify;
function isSnowflake(value) {
    return value["species"] === "@data/snowflake";
}
exports.isSnowflake = isSnowflake;
async function snowflake(_, data, embed) {
    embed.setTitle(`${constants_2.tail} Snowflake Information`);
    {
        const description = [];
        const { id, processId, sequence, timestamp, workerId } = data;
        description.push((0, util_1.fmt)("**Id**: `{id}`", { id }));
        description.push((0, util_1.fmt)("**Process Id**: `{processId}`", { processId }));
        description.push((0, util_1.fmt)("**Sequence**: `{sequence}`", { sequence }));
        description.push((0, util_1.fmt)("**Timestamp**: {f} ({r})", {
            f: utils_1.Markup.timestamp(timestamp, constants_1.MarkupTimestampStyles.BOTH_SHORT),
            r: utils_1.Markup.timestamp(timestamp, constants_1.MarkupTimestampStyles.RELATIVE),
        }));
        description.push((0, util_1.fmt)("{tab} {derive} **Unix**: `{timestamp}`", { timestamp, tab: constants_2.tab, derive: constants_2.derive }));
        description.push((0, util_1.fmt)("**Worker Id**: {workerId}", { workerId }));
        embed.setDescription(description.join("\n"));
    }
    embed.setThumbnail(new emoji_1.UnicodeEmoji("❄").url());
    return embed;
}
exports.snowflake = snowflake;
async function unicodeEmoji(_, data, embed) {
    embed.setTitle(`${constants_2.tail} Emoji Information (Unicode)`);
    embed.setThumbnail(data.url());
    const { category, keywords, name, sub_category, children } = data.info();
    {
        const description = [];
        description.push((0, util_1.fmt)("**Name**: `{name}`", { name }));
        description.push((0, util_1.fmt)("**Category**: {category}: {sub}", {
            category: category.name,
            sub: sub_category.name,
        }));
        description.push((0, util_1.fmt)("**Codepoints**: `{codepoints}`", { codepoints: data.codepoints() }));
        if (keywords && keywords.length) {
            description.push((0, util_1.fmt)("**Key Words**: {kw}", {
                kw: keywords.map((x) => utils_1.Markup.codestring(x)).join(", "),
            }));
        }
        embed.setDescription(description.join("\n"));
    }
    if (children && children.length) {
        embed.addField(`${constants_2.tail} Children`, children.map((x) => `${x.emoji} ${x.name}`).join("\n"));
    }
    return embed;
}
exports.unicodeEmoji = unicodeEmoji;
async function customEmoji(_, data, embed) {
    embed.setTitle(`${constants_2.tail} Emoji Information (Custom)`);
    embed.setThumbnail(data.url());
    {
        const description = [];
        description.push((0, util_1.fmt)("**Id**: `{id}`", { id: data.id }));
        description.push((0, util_1.fmt)("**Name**: [{name}]({url})", { name: data.name, url: data.url() }));
        if (data.animated) {
            description.push("**Animated**: Yes");
        }
        const unix = utils_1.Snowflake.timestamp(data.id);
        description.push((0, util_1.fmt)("**Created**: {f} ({r})", {
            f: utils_1.Markup.timestamp(unix, constants_1.MarkupTimestampStyles.BOTH_SHORT),
            r: utils_1.Markup.timestamp(unix, constants_1.MarkupTimestampStyles.RELATIVE),
        }));
        const discord = data.data();
        if (discord) {
            if (discord.guild) {
                description.push((0, util_1.fmt)("**Server**: [{guild}]({url})", {
                    guild: discord.guild.name,
                    url: discord.guild.jumpLink,
                }));
            }
        }
        embed.setDescription(description.join("\n"));
    }
    return embed;
}
exports.customEmoji = customEmoji;
async function role(_, data, embed) {
    embed.setTitle(`${constants_2.tail} Role Information`);
    const { id, color, createdAtUnix, name, managed, isBoosterRole, isDefault, hoist, mentionable, mention, } = data;
    {
        const description = [];
        description.push((0, util_1.fmt)("**Name**: {name} ({mention})", {
            name: utils_1.Markup.codestring(name),
            mention,
        }));
        description.push((0, util_1.fmt)("**Id**: `{id}`", { id }));
        if (color) {
            const hex = color.toString(16).padStart(6);
            description.push((0, util_1.fmt)("**Color**: `#{color}`", { color: hex }));
            embed.setThumbnail((0, util_1.fmt)("https://api.clancy.lol/image/color/256x256/{hex}", { hex }));
        }
        else {
            embed.setThumbnail(new emoji_1.UnicodeEmoji("❔").url());
        }
        description.push((0, util_1.fmt)("**Created**: {f} ({r})", {
            f: utils_1.Markup.timestamp(createdAtUnix, constants_1.MarkupTimestampStyles.BOTH_SHORT),
            r: utils_1.Markup.timestamp(createdAtUnix, constants_1.MarkupTimestampStyles.RELATIVE),
        }));
        description.push((0, util_1.fmt)("**Server**: [{guild}]({guildUrl})", {
            guild: data.guild?.name,
            guildUrl: data.guild?.jumpLink,
        }));
        const tags = [];
        if (managed) {
            tags.push("Managed");
        }
        if (isBoosterRole) {
            tags.push("Booster Role");
        }
        if (isDefault) {
            tags.push("Default Role");
        }
        if (hoist) {
            tags.push("Hoisted");
        }
        if (mentionable) {
            tags.push("Mentionable");
        }
        if (tags.length) {
            description.push((0, util_1.fmt)("**Tags**: {tags}", { tags: tags.join(", ") }));
        }
        embed.setDescription(description.join("\n"));
    }
    const permissions = (0, util_1.permissionsText)(data);
    if (permissions.length) {
        embed.addField(`${constants_2.tail} Permissions`, permissions.join(", "));
    }
    return embed;
}
exports.role = role;
async function channel(_, data, embed) {
    embed.setTitle(`${constants_2.tail} Channel Information`);
    const { name, mention, id, createdAtUnix, position, parent, jumpLink, guild, } = data;
    {
        const description = [];
        description.push((0, util_1.fmt)("**Name**: [{name}]({jumpLink}) ({mention})", {
            name,
            mention,
            jumpLink,
        }));
        description.push((0, util_1.fmt)("**Id**: `{id}`", { id }));
        description.push((0, util_1.fmt)("**Created At**: {f} ({r})", {
            f: utils_1.Markup.timestamp(createdAtUnix, constants_1.MarkupTimestampStyles.BOTH_SHORT),
            r: utils_1.Markup.timestamp(createdAtUnix, constants_1.MarkupTimestampStyles.RELATIVE),
        }));
        description.push((0, util_1.fmt)("**Position**: `{position}`", { position }));
        if (parent) {
            description.push((0, util_1.fmt)("**Parent Channel**: [{name}]({jumpLink}) ({mention})", {
                name: parent.name,
                jumpLink: parent.jumpLink,
                mention: parent.mention,
            }));
        }
        if (data.threads.size) {
            description.push((0, util_1.fmt)("**Threads**: {threads}", { threads: data.threads.size }));
        }
        if (guild) {
            description.push((0, util_1.fmt)("**Server**: [{name}]({jumpLink})", {
                name: guild.name,
                jumpLink: guild.jumpLink,
            }));
        }
        embed.setDescription(description.join("\n"));
    }
    {
        const description = [];
        switch (data.type) {
            case constants_1.ChannelTypes.DM:
            case constants_1.ChannelTypes.GROUP_DM:
            case constants_1.ChannelTypes.GUILD_NEWS:
            case constants_1.ChannelTypes.GUILD_NEWS_THREAD:
            case constants_1.ChannelTypes.GUILD_PRIVATE_THREAD:
            case constants_1.ChannelTypes.GUILD_PUBLIC_THREAD:
            case constants_1.ChannelTypes.GUILD_TEXT: {
                if (data.nsfw) {
                    description.push("**Nsfw**: Yes");
                }
                if (data.rateLimitPerUser) {
                    description.push((0, util_1.fmt)("**Slowmode**: {slowmode}", {
                        slowmode: markdown_1.Markdown.toTimeString(data.rateLimitPerUser * 1000),
                    }));
                }
                if (data.lastMessage) {
                    description.push((0, util_1.fmt)("**Last Message**: [here]({jumpLink})", {
                        jumpLink: data.lastMessage.jumpLink,
                    }));
                }
                if (data.owner) {
                    description.push((0, util_1.fmt)("**Owner**: [{tag}]({jumpLink}) ({mention})", {
                        tag: data.owner.tag,
                        jumpLink: data.owner.jumpLink,
                        mention: data.owner.mention,
                    }));
                }
                if (data.recipients.size) {
                    description.push((0, util_1.fmt)("**Recipients**: {users}", {
                        users: data.recipients.map((x) => x.mention).join(", "),
                    }));
                }
                break;
            }
            case constants_1.ChannelTypes.GUILD_STAGE_VOICE:
            case constants_1.ChannelTypes.GUILD_VOICE: {
                description.push((0, util_1.fmt)("**Bitrate**: {bytes}/second", {
                    bytes: (0, util_1.formatBytes)(data.bitrate || 0, undefined, undefined),
                }));
                description.push((0, util_1.fmt)("**User Limit**: {current}/{max}", {
                    current: data.voiceStates.size,
                    max: data.userLimit,
                }));
                if (data.videoQualityMode) {
                    description.push((0, util_1.fmt)("Video Quality: {quality}", {
                        quality: constants_2.VideoQualityModesText[data.videoQualityMode],
                    }));
                }
                if (data.stageInstance) {
                    description.push((0, util_1.fmt)("**Privacy**: {privacy}", {
                        privacy: constants_2.StagePrivacyLevelsText[data.stageInstance.privacyLevel],
                    }));
                    description.push((0, util_1.fmt)("**Moderators**: {count}", {
                        count: data.stageInstance.moderators.size,
                    }));
                    description.push((0, util_1.fmt)("**Speakers**: {count}", {
                        count: data.stageInstance.speakers.size,
                    }));
                    description.push((0, util_1.fmt)("**Listeners**: {count}", {
                        count: data.stageInstance.listeners.size,
                    }));
                }
                break;
            }
            case constants_1.ChannelTypes.GUILD_CATEGORY: {
                description.push((0, util_1.fmt)("**Children**: {count}", { count: data.children.size }));
                break;
            }
            case constants_1.ChannelTypes.GUILD_FORUM: {
                if (data.defaultAutoArchiveDuration) {
                    description.push((0, util_1.fmt)("**Default Auto Archive Duration**: {s} seconds", {
                        s: data.defaultAutoArchiveDuration / 1000,
                    }));
                }
                if (data.template) {
                    description.push((0, util_1.fmt)("**Template**: `{template}`", { template: data.template }));
                }
                if (data.availableTags.size) {
                    description.push((0, util_1.fmt)("**Available Tags**: {tags}", {
                        tags: data.availableTags
                            .map((x) => {
                            const title = utils_1.Markup.codestring(x.emojiId ? x.name : `${x.emojiName} \`${x.name}\``);
                            if (x.emojiId) {
                                return `<:${x.emojiName}:${x.emojiId}> ${title}`;
                            }
                            else {
                                return title;
                            }
                        })
                            .join(", "),
                    }));
                }
                break;
            }
        }
        if (description.length) {
            embed.addField(`${constants_2.tail} ${constants_2.ChannelTypesText[data.type]} Channel Information`, description.join("\n"));
        }
    }
    embed.setThumbnail(getChannelIcon(data));
    return embed;
}
exports.channel = channel;
function getChannelIcon(channel) {
    if (channel instanceof structures_1.ChannelDM) {
        return (channel.iconUrl || channel.defaultIconUrl || new emoji_1.UnicodeEmoji("❔").url());
    }
    switch (channel.type) {
        case constants_1.ChannelTypes.BASE:
            return emoji_1.CustomEmoji.url("<:RichActivity:1026594063383797872>");
        case constants_1.ChannelTypes.DM:
        case constants_1.ChannelTypes.GROUP_DM:
        case constants_1.ChannelTypes.GUILD_TEXT:
            if (channel.nsfw) {
                return emoji_1.CustomEmoji.url("<:ChannelTextNSFW:1026593425925087333>");
            }
            return emoji_1.CustomEmoji.url("<:ChannelText:1026593423731478658>");
        case constants_1.ChannelTypes.GUILD_CATEGORY:
            return emoji_1.CustomEmoji.url("<:Synced:1026594097277968517>");
        case constants_1.ChannelTypes.GUILD_DIRECTORY:
            return emoji_1.CustomEmoji.url("<:ChannelDirectory:1026593421479116844>");
        case constants_1.ChannelTypes.GUILD_NEWS:
            if (channel.nsfw) {
                return emoji_1.CustomEmoji.url("<:MegaphoneNSFW:1026593923688317028>");
            }
            return emoji_1.CustomEmoji.url("<:Megaphone:1026593921670848583>");
        case constants_1.ChannelTypes.GUILD_NEWS_THREAD:
            if (channel.nsfw) {
                return emoji_1.CustomEmoji.url("<:NSFWAnnouncementThreadIcon:1026593931686850730>");
            }
            return emoji_1.CustomEmoji.url("<:AnnouncementThreadIcon:1026593407163977798>");
        case constants_1.ChannelTypes.GUILD_PUBLIC_THREAD:
            if (channel.nsfw) {
                return emoji_1.CustomEmoji.url("<:NSFWThreadIcon:1026593932240490568>");
            }
            return emoji_1.CustomEmoji.url("<:ThreadIcon:1026594234482049074>");
        case constants_1.ChannelTypes.GUILD_PRIVATE_THREAD:
            return emoji_1.CustomEmoji.url("<:PrivateThreadIcon:1026594059512451225>");
        case constants_1.ChannelTypes.GUILD_STAGE_VOICE:
            return emoji_1.CustomEmoji.url("<:StageEvents:1026594081373175858>");
        case constants_1.ChannelTypes.GUILD_STORE:
            return emoji_1.CustomEmoji.url("<:StoreTag:1026594093511479326>");
        case constants_1.ChannelTypes.GUILD_VOICE:
            return emoji_1.CustomEmoji.url("<:Speaker:1026594073877954623>");
        default:
            return new emoji_1.UnicodeEmoji("❔").url();
    }
}
async function user(_, data, embed) {
    embed.setTitle(`${constants_2.tail} User Information`);
    const { id, avatarUrl, isClientOwner, isSystem, isWebhook, bot, createdAtUnix, defaultAvatarUrl, jumpLink, mention, presence, tag, } = data;
    {
        const description = [];
        const flags = [];
        for (const flag of Object.values(constants_1.UserFlags)) {
            if (typeof flag === "string") {
                continue;
            }
            if (data.hasFlag(flag)) {
                flags.push(constants_2.UserBadges[flag]);
            }
        }
        if (flags.length) {
            description.push(flags.join(""));
        }
        description.push((0, util_1.fmt)("**Id**: `{id}`", { id }));
        description.push((0, util_1.fmt)("**Profile**: [{tag}]({jumpLink}) ({mention})", {
            tag,
            jumpLink,
            mention,
        }));
        description.push((0, util_1.fmt)("**Avatar**: [Main]({avatarUrl}) ([Default]({defaultAvatarUrl}))", {
            avatarUrl,
            defaultAvatarUrl,
        }));
        description.push((0, util_1.fmt)("**Created At**: {f} ({r})", {
            f: utils_1.Markup.timestamp(createdAtUnix, constants_1.MarkupTimestampStyles.BOTH_SHORT),
            r: utils_1.Markup.timestamp(createdAtUnix, constants_1.MarkupTimestampStyles.RELATIVE),
        }));
        {
            const tags = [];
            if (isClientOwner) {
                tags.push("Bot Owner");
            }
            if (isSystem) {
                tags.push("System");
            }
            if (isWebhook) {
                tags.push("Webhook");
            }
            if (bot) {
                tags.push("Bot");
            }
            if (tags.length) {
                description.push((0, util_1.fmt)("**Tags**: {tags}", { tags: tags.join(", ") }));
            }
        }
        embed.setDescription(description.join("\n"));
    }
    if (presence) {
        const description = [];
        description.push((0, util_1.fmt)("{emoji} {text}", {
            emoji: constants_2.StatusEmojis[presence.status],
            text: constants_2.StatusesText[presence.status],
        }));
        let i = 0;
        for (const [, activity] of presence.activities) {
            i++;
            if (activity.isCustomStatus) {
                description.push((0, util_1.fmt)(`{emoji} {state}`, {
                    state: utils_1.Markup.italics(activity.state || ""),
                    emoji: activity.emoji?.toString(),
                }));
                continue;
            }
            let c = i === presence.activities.length ? constants_2.derive : constants_2.delve;
            description.push((0, util_1.fmt)(`{c} {type} **{name}**`, {
                c,
                type: activity.typeText,
                name: activity.name,
            }));
            if (activity.details) {
                description.push((0, util_1.fmt)(`{bar}${constants_2.tab}${constants_2.derive} {details}`, {
                    bar: i === presence.activities.length ? constants_2.tab : constants_2.bar,
                    details: activity.details,
                }));
            }
        }
        embed.addField(`${constants_2.tail} Presence`, description.join("\n"));
    }
    if (data instanceof structures_1.Member) {
        const description = [];
        const { nick, roles, pending, premiumSinceUnix, voiceState } = data;
        if (nick !== null) {
            description.push((0, util_1.fmt)("**Nickname**: {nick}", { nick: utils_1.Markup.codestring(nick) }));
        }
        if (roles.size) {
            description.push((0, util_1.fmt)("**Roles**: {roles}", {
                roles: roles.map((x) => x?.mention).join(", "),
            }));
        }
        if (premiumSinceUnix) {
            description.push((0, util_1.fmt)("**Boosting Since**: {f} ({r})", {
                f: utils_1.Markup.timestamp(premiumSinceUnix, constants_1.MarkupTimestampStyles.BOTH_SHORT),
                r: utils_1.Markup.timestamp(premiumSinceUnix, constants_1.MarkupTimestampStyles.RELATIVE),
            }));
        }
        if (pending) {
            description.push("**Pending Membership**: Yes");
        }
        if (voiceState) {
            const emojis = [];
            const { deaf, isAudience, isSpeaking, mute, requestToSpeakTimestampUnix, selfDeaf, selfMute, selfStream, selfVideo, suppress, channel, isSpeaker, } = voiceState;
            if (isSpeaker) {
                if (isSpeaking) {
                    emojis.push("<:Online:1029941068294279238>");
                }
                else {
                    emojis.push("<:Offline:1029941237916110848>");
                }
            }
            if (selfMute || mute) {
                emojis.push("<:SpeakerMuted:1026594076201603092>");
            }
            if (selfDeaf || deaf) {
                emojis.push("<:NoiseCancellationDisabled:1026593930684416152>");
            }
            if (isAudience) {
                emojis.push("<:GoToAudience:1026593904365146236>");
            }
            if (requestToSpeakTimestampUnix) {
                emojis.push("<:StageEvents:1026594081373175858>");
            }
            if (selfStream) {
                emojis.push("<:Stream:1026594094652330054>");
            }
            if (selfVideo) {
                emojis.push("<:CallVideoCamera:1026593417909780590>");
            }
            if (suppress) {
                emojis.push("<:SpeakerLimited:1026594075308212325>");
            }
            if (emojis.length) {
                description.push((0, util_1.fmt)("**Voice State**: {emojis} in {channel}", {
                    emojis: emojis.join(""),
                    channel: channel?.mention || "(unknown)",
                }));
            }
        }
        if (description.length) {
            embed.addField(`${constants_2.tail} Member Information`, "\u200b" + constants_2.tab + description.join(`\n${constants_2.tab}`));
        }
        const permissions = (0, util_1.permissionsText)(data);
        if (permissions.length) {
            embed.addField(`${constants_2.tail} Permissions`, permissions.join(", "));
        }
    }
    embed.setThumbnail(avatarUrl || defaultAvatarUrl);
    return embed;
}
exports.user = user;
async function guild(_, data, embed) {
    embed.setTitle(`${constants_2.tail} Server Information`);
    const { name, id, bannerUrl, createdAtUnix, defaultMessageNotifications, description: gdescription, explicitContentFilter, iconUrl, isDiscoverable, isPartnered, isPublic, isVerified, jumpLink, maxAttachmentSize, maxBitrate, maxEmojis, maxMembers, maxPresences, maxVideoChannelUsers, mfaLevel, nsfwLevel, owner, preferredLocaleText, vanityUrlCode, verificationLevel, } = data;
    {
        const description = [];
        if (gdescription) {
            description.push(utils_1.Markup.italics(gdescription) + "\n");
        }
        description.push((0, util_1.fmt)("**Id**: `{id}`", { id }));
        description.push((0, util_1.fmt)("**Created At**: {f} ({r})", {
            f: utils_1.Markup.timestamp(createdAtUnix, constants_1.MarkupTimestampStyles.BOTH_SHORT),
            r: utils_1.Markup.timestamp(createdAtUnix, constants_1.MarkupTimestampStyles.RELATIVE),
        }));
        if (owner) {
            description.push((0, util_1.fmt)("**Owner**: [{tag}]({jumpLink}) ({mention})", {
                jumpLink: owner.jumpLink,
                tag: owner.tag,
                mention: owner.mention,
            }));
        }
        description.push((0, util_1.fmt)("**Link**: [{name}]({jumpLink})", { jumpLink, name }));
        if (vanityUrlCode) {
            description.push((0, util_1.fmt)("**Vanity URL**: <https://discord.gg/{vanityUrlCode}>", {
                vanityUrlCode,
            }));
        }
        description.push((0, util_1.fmt)("**Locale**: {preferredLocaleText}", { preferredLocaleText }));
        {
            const tags = [];
            if (isDiscoverable) {
                tags.push("Discoverable");
            }
            if (isPartnered) {
                tags.push("Partnered");
            }
            if (isVerified) {
                tags.push("Verified");
            }
            if (isPublic) {
                tags.push("Public");
            }
            if (tags.length) {
                description.push((0, util_1.fmt)("**Tags**: {tags}", { tags: tags.join(", ") }));
            }
        }
        embed.setDescription(description.join("\n"));
    }
    {
        const description = [];
        description.push((0, util_1.fmt)("\n**MFA Level**: {text}", { text: constants_2.GuildMfaLevelsText[mfaLevel] }));
        description.push((0, util_1.fmt)("**NSFW Level**: {text}", { text: constants_2.GuildNsfwLevelsText[nsfwLevel] }));
        description.push((0, util_1.fmt)("**Content Filter**: {text}", {
            text: constants_2.GuildExplicitContentFiltersText[explicitContentFilter],
        }));
        description.push((0, util_1.fmt)("**Verification Level**: {text}", {
            text: constants_2.GuildVerificationLevelsText[verificationLevel],
        }));
        description.push((0, util_1.fmt)("**Default Message Notifications**: {text}", {
            text: defaultMessageNotifications === 1 ? "Mentions" : "All Messages",
        }));
        if (description.length) {
            embed.addField(`${constants_2.tail} Settings`, description.join("\n"));
        }
    }
    {
        const description = [];
        if (maxAttachmentSize) {
            description.push((0, util_1.fmt)("**Attachment Size**: {bytes}", {
                bytes: (0, util_1.formatBytes)(maxAttachmentSize),
            }));
        }
        if (maxBitrate) {
            description.push((0, util_1.fmt)("**Bitrate**: {bytes}/s", {
                bytes: (0, util_1.formatBytes)(maxBitrate),
            }));
        }
        if (maxEmojis) {
            description.push((0, util_1.fmt)("**Emojis**: {maxEmojis}", {
                maxEmojis,
            }));
        }
        if (maxMembers) {
            description.push((0, util_1.fmt)("**Members**: {maxMembers}", {
                maxMembers,
            }));
        }
        if (maxPresences) {
            description.push((0, util_1.fmt)("**Presences**: {maxPresences}", {
                maxPresences,
            }));
        }
        if (maxVideoChannelUsers) {
            description.push((0, util_1.fmt)("**Video Channel Users**: {maxVideoChannelUsers}", {
                maxVideoChannelUsers,
            }));
        }
        if (description.length) {
            embed.addField(`${constants_2.tail} Limits`, description.join("\n"));
        }
    }
    {
        const { channels, emojis, members, roles, stageInstances, stickers, voiceStates, premiumSubscriptionCount, } = data;
        const counts = [];
        if (channels.size) {
            counts.push(["<:ChannelText:1026593423731478658>", channels.size]);
        }
        if (emojis.size) {
            counts.push(["<:EmojiSmile:1026593400864116880>", emojis.size]);
        }
        if (stickers.size) {
            counts.push(["<:Sticker:1026594086779625489>", stickers.size]);
        }
        if (members.size) {
            counts.push(["<:Person:1026593940062871692>", members.size]);
        }
        if (roles.size) {
            counts.push(["<:ShieldStar:1026594069490696222>", roles.size]);
        }
        if (stageInstances.size) {
            counts.push(["<:StageEvents:1026594081373175858>", stageInstances.size]);
        }
        if (voiceStates.size) {
            counts.push(["<:Speaker:1026594073877954623>", voiceStates.size]);
        }
        if (premiumSubscriptionCount > 0) {
            counts.push([
                "<:PremiumGuildSubscriberBadge:1026594057184612442>",
                premiumSubscriptionCount,
            ]);
        }
        let txt = "";
        for (let i = 0; i < counts.length; i++) {
            let [e, t] = counts[i];
            if (i % 8 === 0 && i > 0) {
                txt += "\n";
            }
            txt += `${e} ${t}${constants_2.tab}`;
        }
        if (counts.length) {
            embed.addField("\u200b", txt);
        }
    }
    if (bannerUrl) {
        embed.setImage(bannerUrl);
    }
    embed.setThumbnail(iconUrl || new emoji_1.UnicodeEmoji("❔").url());
    return embed;
}
exports.guild = guild;
async function message(_, data, embed) {
    embed.setTitle(`${constants_2.tail} Message Information`);
    const { author, createdAtUnix, editedAtUnix, deleted, pinned, reactions, id, referencedMessage, jumpLink, thread, fromBot, fromMe, fromSystem, fromUser, fromWebhook, hasFlagCrossposted, hasFlagEphemeral, hasFlagFailedToMentionSomeRolesInThread, hasFlagHasThread, hasFlagIsCrossposted, hasFlagLoading, hasFlagSourceMessageDeleted, hasFlagSuppressEmbeds, hasFlagUrgent, } = data;
    {
        const description = [];
        description.push((0, util_1.fmt)("**Id**: `{id}`", { id }));
        description.push((0, util_1.fmt)("**Author**: [{tag}]({jumpLink}) ({mention})", {
            jumpLink: author.jumpLink,
            mention: author.mention,
            tag: author.tag,
        }));
        description.push((0, util_1.fmt)("**Created At**: {f} ({r})", {
            f: utils_1.Markup.timestamp(createdAtUnix, constants_1.MarkupTimestampStyles.BOTH_SHORT),
            r: utils_1.Markup.timestamp(createdAtUnix, constants_1.MarkupTimestampStyles.RELATIVE),
        }));
        if (editedAtUnix) {
            description.push((0, util_1.fmt)("**Last Edited At**: {f} ({r})", {
                f: utils_1.Markup.timestamp(editedAtUnix, constants_1.MarkupTimestampStyles.BOTH_SHORT),
                r: utils_1.Markup.timestamp(editedAtUnix, constants_1.MarkupTimestampStyles.RELATIVE),
            }));
        }
        if (deleted) {
            description.push("**Deleted**: Yes");
        }
        if (pinned) {
            description.push("**Pinned**: Yes");
        }
        if (thread) {
            description.push((0, util_1.fmt)("**Attached Thread**: [{name}]({jumpLink}) ({mention})", {
                name: thread.name,
                jumpLink: thread.jumpLink,
                mention: thread.mention,
            }));
        }
        {
            const tags = [];
            if (fromBot) {
                tags.push("From Bot");
            }
            if (fromMe) {
                tags.push("From Me");
            }
            if (fromSystem) {
                tags.push("From System");
            }
            if (fromUser) {
                tags.push("From User");
            }
            if (fromWebhook) {
                tags.push("From Webhook");
            }
            if (hasFlagCrossposted) {
                tags.push("Cross-Posted");
            }
            if (hasFlagEphemeral) {
                tags.push("Ephemeral");
            }
            if (hasFlagFailedToMentionSomeRolesInThread) {
                tags.push("Failed to mention some roles in thread");
            }
            if (hasFlagHasThread) {
                tags.push("Has Thread");
            }
            if (hasFlagIsCrossposted) {
                tags.push("Is Cross-Posted");
            }
            if (hasFlagLoading) {
                tags.push("Loading");
            }
            if (hasFlagSourceMessageDeleted) {
                tags.push("Source Message Deleted");
            }
            if (hasFlagSuppressEmbeds) {
                tags.push("Suppress Embeds");
            }
            if (hasFlagUrgent) {
                tags.push("Urgent");
            }
            if (tags.length) {
                description.push((0, util_1.fmt)("**Tags**: {tags}", { tags: tags.join(", ") }));
            }
        }
        if (referencedMessage) {
            description.push((0, util_1.fmt)("**Replying to**: [here]({jumpLink})", {
                jumpLink: referencedMessage.jumpLink,
            }));
        }
        if (jumpLink) {
            description.push((0, util_1.fmt)("**Jump Link**: [here]({jumpLink})", { jumpLink }));
        }
        if (description.length) {
            embed.setDescription(description.join("\n"));
        }
    }
    if (reactions.size) {
        embed.addField(`${constants_2.tail} Reactions`, reactions
            .map((x) => `${x.emoji.toString()} \`${x.count.toLocaleString()}\``)
            .join(" "));
    }
    embed.setThumbnail(emoji_1.CustomEmoji.url("<:ChatBubble:1026593427103678624>"));
    return embed;
}
exports.message = message;
