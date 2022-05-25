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
exports.channel = void 0;
const constants_1 = require("detritus-client/lib/constants");
const constants_2 = require("../../constants");
const emojis_1 = require("../emojis");
const markdown_1 = require("../markdown");
const tools_1 = require("../tools");
const Basic = __importStar(require("./basic"));
const Embed = __importStar(require("./embed"));
async function channel(context, args) {
    const { channel } = args;
    const embed = Embed.user(context);
    embed.setTitle("#" + channel.name);
    embed.setUrl(channel.jumpLink);
    if (channel.topic) {
        embed.setDescription(channel.topic);
    }
    {
        const description = [];
        description.push(Basic.field(emojis_1.Emojis.GEAR, "ID", markdown_1.Markdown.Format.codestring(channel.id)));
        description.push(Basic.field(emojis_1.Emojis.LINK, "Profile", `${markdown_1.Markdown.Format.link(`#${channel.name}`, channel.jumpLink)} (${channel.mention})`));
        description.push(Basic.field(emojis_1.Emojis.CALENDAR, "Created At", (0, tools_1.buildTimestampString)(channel.createdAtUnix)));
        if (channel.position) {
            description.push(Basic.field(emojis_1.Emojis.BOOKMARK_TABS, "Position", markdown_1.Markdown.Format.codestring(channel.position.toLocaleString())));
        }
        if (channel.parent) {
            description.push(Basic.field("<:IconChannel_Category:798624247122493450>", "Category", `${markdown_1.Markdown.Format.link(`#${channel.parent.name}`, channel.parent.jumpLink)} (${channel.parent.mention})`));
        }
        if (channel.guild) {
            description.push(Basic.field(emojis_1.Emojis.SHIELD, "Server", `${markdown_1.Markdown.Format.link(channel.guild.name, channel.guild.jumpLink)} (${markdown_1.Markdown.Format.codestring(channel.guild.id)})`));
        }
        if (channel.threads.size) {
            description.push(Basic.field("<:IconChannel_Thread:836610428570173472>", "Threads", String(channel.threads.size)));
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
                    description.push(Basic.field(emojis_1.Emojis.WARNING, "NSFW", (0, constants_2.BooleanText)(channel.nsfw)));
                }
                if (channel.rateLimitPerUser) {
                    description.push(Basic.field("<:IconGui_Slowmode:798624247337058354>", "Slowmode", markdown_1.Markdown.toTimeString(channel.rateLimitPerUser * 1000)));
                }
                if (channel.lastMessage) {
                    description.push(Basic.field("<:IconChannel_Thread:836610428570173472>", "Last Message", (0, tools_1.buildTimestampString)(channel.lastMessage.createdAtUnix)));
                    description.push(Basic.field("<:blank:835277151031787541>", "-> Jump Link", markdown_1.Markdown.Format.link("#" + channel.name, channel.jumpLink)));
                }
                if (channel.lastPinTimestampUnix) {
                    description.push(Basic.field("<:IconGui_Pins:798624239367225388>", "Last Pinned Message", (0, tools_1.buildTimestampString)(channel.lastPinTimestampUnix)));
                }
                if (channel.owner) {
                    description.push(Basic.field("<:IconGui_OwnerCrown:799657143719952415>", "Owner", `${markdown_1.Markdown.Format.link(channel.owner.tag, channel.owner.jumpLink)} (${channel.owner.mention})`));
                }
                if (channel.recipients) {
                    Basic.field("<:IconGui_Members:798624241868079104>", "Recipients", channel.recipients.size.toLocaleString());
                }
                break;
            }
            case constants_1.ChannelTypes.GUILD_STAGE_VOICE:
            case constants_1.ChannelTypes.GUILD_VOICE: {
                description.push(Basic.field("<:IconChannel_Voice:798624234732781580>", "Bitrate", `${(0, tools_1.formatBytes)(channel.bitrate || 0, undefined, undefined, true)}/second`));
                description.push(Basic.field("<:IconGui_Members:798624241868079104>", "User Limit", `${channel.voiceStates.size}/${channel.userLimit}`));
                if (channel.videoQualityMode) {
                    description.push(Basic.field("<:IconGui_Video:837043839662424104>", "Video Quality", constants_2.VideoQualityModesText[channel.videoQualityMode]));
                }
                if (channel.stageInstance) {
                    description.push(Basic.field(emojis_1.Emojis.WARNING, "Privacy", constants_2.StagePrivacyLevelsText[channel.stageInstance.privacyLevel]));
                    description.push(Basic.field("<:IconGui_Members:798624241868079104>", "Moderators", channel.stageInstance.moderators.size.toLocaleString()));
                    description.push(Basic.field(emojis_1.Emojis.MICROPHONE, "Speakers", channel.stageInstance.speakers.size.toLocaleString()));
                    description.push(Basic.field(emojis_1.Emojis.WAVE, "Listeners", channel.stageInstance.listeners.size.toLocaleString()));
                }
                break;
            }
            case constants_1.ChannelTypes.GUILD_CATEGORY: {
                description.push(Basic.field("<:IconChannel_Category:798624247122493450>", "Children", channel.children.size.toLocaleString()));
                break;
            }
            case constants_1.ChannelTypes.GUILD_DIRECTORY: {
                break;
            }
            case constants_1.ChannelTypes.GUILD_FORUM: {
                if (channel.defaultAutoArchiveDuration) {
                    description.push(Basic.field("<:IconGui_Slowmode:798624247337058354>", "Default Auto Archive Duration", (0, tools_1.buildTimestampString)(channel.defaultAutoArchiveDuration)));
                }
                if (channel.template) {
                    description.push(Basic.field("<:IconGui_RichPresence:798624241351655514>", "Template", markdown_1.Markdown.Format.codestring(channel.template)));
                }
                if (channel.availableTags.size) {
                    description.push(Basic.field("<:IconChannel_Str:798624234745757727>", "Available Tags", channel.availableTags
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
