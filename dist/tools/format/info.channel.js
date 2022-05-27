"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channel = void 0;
const constants_1 = require("detritus-client/lib/constants");
const constants_2 = require("../../constants");
const emojis_1 = require("../emojis");
const markdown_1 = require("../markdown");
const tools_1 = require("../tools");
const basic_1 = require("./basic");
const embed_1 = require("./embed");
async function channel(context, args) {
    const { channel } = args;
    const embed = embed_1.Embed.user(context);
    embed.setTitle("#" + channel.name);
    embed.setUrl(channel.jumpLink);
    if (channel.topic) {
        embed.setDescription(channel.topic);
    }
    {
        const description = [];
        description.push(basic_1.Basic.field(emojis_1.Emojis.GEAR, "ID", markdown_1.Markdown.Format.codestring(channel.id)));
        description.push(basic_1.Basic.field(emojis_1.Emojis.LINK, "Profile", `${markdown_1.Markdown.Format.link(`#${channel.name}`, channel.jumpLink)} (${channel.mention})`));
        description.push(basic_1.Basic.field(emojis_1.Emojis.CALENDAR, "Created At", (0, tools_1.buildTimestampString)(channel.createdAtUnix)));
        if (channel.position) {
            description.push(basic_1.Basic.field(emojis_1.Emojis.BOOKMARK_TABS, "Position", markdown_1.Markdown.Format.codestring(channel.position.toLocaleString())));
        }
        if (channel.parent) {
            description.push(basic_1.Basic.field("<:IconChannel_Category:798624247122493450>", "Category", `${markdown_1.Markdown.Format.link(`#${channel.parent.name}`, channel.parent.jumpLink)} (${channel.parent.mention})`));
        }
        if (channel.guild) {
            description.push(basic_1.Basic.field(emojis_1.Emojis.SHIELD, "Server", `${markdown_1.Markdown.Format.link(channel.guild.name, channel.guild.jumpLink)} (${markdown_1.Markdown.Format.codestring(channel.guild.id)})`));
        }
        if (channel.threads.size) {
            description.push(basic_1.Basic.field("<:IconChannel_Thread:836610428570173472>", "Threads", String(channel.threads.size)));
        }
        embed.addField("Channel Info", description.join("\n"));
    }
    {
        const description = [];
        switch (channel.type) {
            case constants_1.ChannelTypes.DM:
            case constants_1.ChannelTypes.GROUP_DM:
            case constants_1.ChannelTypes.GUILD_NEWS:
            case constants_1.ChannelTypes.GUILD_NEWS_THREAD:
            case constants_1.ChannelTypes.GUILD_PRIVATE_THREAD:
            case constants_1.ChannelTypes.GUILD_PUBLIC_THREAD:
            case constants_1.ChannelTypes.GUILD_TEXT: {
                if (channel.nsfw) {
                    description.push(basic_1.Basic.field(emojis_1.Emojis.WARNING, "NSFW", (0, constants_2.BooleanText)(channel.nsfw)));
                }
                if (channel.rateLimitPerUser) {
                    description.push(basic_1.Basic.field("<:IconGui_Slowmode:798624247337058354>", "Slowmode", markdown_1.Markdown.toTimeString(channel.rateLimitPerUser * 1000)));
                }
                if (channel.lastMessage) {
                    description.push(basic_1.Basic.field("<:IconChannel_Thread:836610428570173472>", "Last Message", (0, tools_1.buildTimestampString)(channel.lastMessage.createdAtUnix)));
                    description.push(basic_1.Basic.field("<:blank:835277151031787541>", "-> Jump Link", markdown_1.Markdown.Format.link("#" + channel.name, channel.jumpLink)));
                }
                if (channel.lastPinTimestampUnix) {
                    description.push(basic_1.Basic.field("<:IconGui_Pins:798624239367225388>", "Last Pinned Message", (0, tools_1.buildTimestampString)(channel.lastPinTimestampUnix)));
                }
                if (channel.owner) {
                    description.push(basic_1.Basic.field("<:IconGui_OwnerCrown:799657143719952415>", "Owner", `${markdown_1.Markdown.Format.link(channel.owner.tag, channel.owner.jumpLink)} (${channel.owner.mention})`));
                }
                if (channel.recipients) {
                    basic_1.Basic.field("<:IconGui_Members:798624241868079104>", "Recipients", channel.recipients.size.toLocaleString());
                }
                break;
            }
            case constants_1.ChannelTypes.GUILD_STAGE_VOICE:
            case constants_1.ChannelTypes.GUILD_VOICE: {
                description.push(basic_1.Basic.field("<:IconChannel_Voice:798624234732781580>", "Bitrate", `${(0, tools_1.formatBytes)(channel.bitrate || 0, undefined, undefined, true)}/second`));
                description.push(basic_1.Basic.field("<:IconGui_Members:798624241868079104>", "User Limit", `${channel.voiceStates.size}/${channel.userLimit}`));
                if (channel.videoQualityMode) {
                    description.push(basic_1.Basic.field("<:IconGui_Video:837043839662424104>", "Video Quality", constants_2.VideoQualityModesText[channel.videoQualityMode]));
                }
                if (channel.stageInstance) {
                    description.push(basic_1.Basic.field(emojis_1.Emojis.WARNING, "Privacy", constants_2.StagePrivacyLevelsText[channel.stageInstance.privacyLevel]));
                    description.push(basic_1.Basic.field("<:IconGui_Members:798624241868079104>", "Moderators", channel.stageInstance.moderators.size.toLocaleString()));
                    description.push(basic_1.Basic.field(emojis_1.Emojis.MICROPHONE, "Speakers", channel.stageInstance.speakers.size.toLocaleString()));
                    description.push(basic_1.Basic.field(emojis_1.Emojis.WAVE, "Listeners", channel.stageInstance.listeners.size.toLocaleString()));
                }
                break;
            }
            case constants_1.ChannelTypes.GUILD_CATEGORY: {
                description.push(basic_1.Basic.field("<:IconChannel_Category:798624247122493450>", "Children", channel.children.size.toLocaleString()));
                break;
            }
            case constants_1.ChannelTypes.GUILD_DIRECTORY: {
                break;
            }
            case constants_1.ChannelTypes.GUILD_FORUM: {
                if (channel.defaultAutoArchiveDuration) {
                    description.push(basic_1.Basic.field("<:IconGui_Slowmode:798624247337058354>", "Default Auto Archive Duration", (0, tools_1.buildTimestampString)(channel.defaultAutoArchiveDuration)));
                }
                if (channel.template) {
                    description.push(basic_1.Basic.field("<:IconGui_RichPresence:798624241351655514>", "Template", markdown_1.Markdown.Format.codestring(channel.template)));
                }
                if (channel.availableTags.size) {
                    description.push(basic_1.Basic.field("<:IconChannel_Str:798624234745757727>", "Available Tags", channel.availableTags
                        .map((x) => {
                        const title = markdown_1.Markdown.Format.codestring(x.emojiId
                            ? x.name
                            : `${x.emojiName} ${markdown_1.Markdown.Format.codestring(x.name)}`);
                        if (x.emojiId) {
                            return `<:${x.emojiName}:${x.emojiId}> ${title}`;
                        }
                        else {
                            return title;
                        }
                    })
                        .join(", ")));
                }
                break;
            }
        }
        if (description.length) {
            embed.addField(`${constants_2.ChannelTypesText[channel.type]} Info`, description.join("\n"));
        }
    }
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.channel = channel;
