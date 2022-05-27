import { Context } from "detritus-client/lib/command";
import { ChannelTypes } from "detritus-client/lib/constants";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Channel } from "detritus-client/lib/structures";
import {
  BooleanText,
  ChannelTypesText,
  StagePrivacyLevelsText,
  VideoQualityModesText,
} from "../../constants";
import { CustomEmojis, Emojis } from "../emojis";
import { Markdown } from "../markdown";
import { buildTimestampString, editOrReply, formatBytes } from "../tools";
import { Basic } from "./basic";
import { Embed } from "./embed";
export interface ChannelArgs {
  channel: Channel;
}

export async function channel(
  context: Context | InteractionContext,
  args: ChannelArgs
) {
  const { channel } = args;
  const embed = Embed.user(context);

  embed.setTitle("#" + channel.name);
  embed.setUrl(channel.jumpLink);

  if (channel.topic) {
    embed.setDescription(channel.topic);
  }

  {
    const description: Array<string> = [];
    description.push(
      Basic.field(Emojis.GEAR, "ID", Markdown.Format.codestring(channel.id))
    );

    description.push(
      Basic.field(
        Emojis.LINK,
        "Profile",
        `${Markdown.Format.link(`#${channel.name}`, channel.jumpLink)} (${
          channel.mention
        })`
      )
    );

    description.push(
      Basic.field(
        Emojis.CALENDAR,
        "Created At",
        buildTimestampString(channel.createdAtUnix)
      )
    );

    if (channel.position) {
      description.push(
        Basic.field(
          Emojis.BOOKMARK_TABS,
          "Position",
          Markdown.Format.codestring(channel.position.toLocaleString())
        )
      );
    }

    if (channel.parent) {
      description.push(
        Basic.field(
          CustomEmojis.CHANNEL_CATEGORY,
          "Category",
          `${Markdown.Format.link(
            `#${channel.parent.name}`,
            channel.parent.jumpLink
          )} (${channel.parent.mention})`
        )
      );
    }

    if (channel.guild) {
      description.push(
        Basic.field(
          Emojis.SHIELD,
          "Server",
          `${Markdown.Format.link(
            channel.guild.name,
            channel.guild.jumpLink
          )} (${Markdown.Format.codestring(channel.guild.id)})`
        )
      );
    }

    if (channel.threads.size) {
      description.push(
        Basic.field(
          CustomEmojis.CHANNEL_THREAD,
          "Threads",
          String(channel.threads.size)
        )
      );
    }

    embed.addField("Channel Info", description.join("\n"));
  }

  {
    const description: Array<string> = [];
    switch (channel.type) {
      case ChannelTypes.DM:
      case ChannelTypes.GROUP_DM:
      case ChannelTypes.GUILD_NEWS:
      case ChannelTypes.GUILD_NEWS_THREAD:
      case ChannelTypes.GUILD_PRIVATE_THREAD:
      case ChannelTypes.GUILD_PUBLIC_THREAD:
      case ChannelTypes.GUILD_TEXT: {
        if (channel.nsfw) {
          description.push(
            Basic.field(Emojis.WARNING, "NSFW", BooleanText(channel.nsfw))
          );
        }

        if (channel.rateLimitPerUser) {
          description.push(
            Basic.field(
              CustomEmojis.GUI_SLOWMODE,
              "Slowmode",
              Markdown.toTimeString(channel.rateLimitPerUser * 1000)
            )
          );
        }

        if (channel.lastMessage) {
          description.push(
            Basic.field(
              CustomEmojis.CHANNEL_THREAD,
              "Last Message",
              buildTimestampString(channel.lastMessage.createdAtUnix)
            )
          );

          description.push(
            Basic.field(
              CustomEmojis.BLANK,
              "-> Jump Link",
              Markdown.Format.link("#" + channel.name, channel.jumpLink)
            )
          );
        }

        if (channel.lastPinTimestampUnix) {
          description.push(
            Basic.field(
              CustomEmojis.GUI_PINS,
              "Last Pinned Message",
              buildTimestampString(channel.lastPinTimestampUnix)
            )
          );
        }

        if (channel.owner) {
          description.push(
            Basic.field(
              CustomEmojis.GUI_OWNERCROWN,
              "Owner",
              `${Markdown.Format.link(
                channel.owner.tag,
                channel.owner.jumpLink
              )} (${channel.owner.mention})`
            )
          );
        }

        if (channel.recipients) {
          Basic.field(
            CustomEmojis.GUI_MEMBERS,
            "Recipients",
            channel.recipients.size.toLocaleString()
          );
        }

        break;
      }
      case ChannelTypes.GUILD_STAGE_VOICE:
      case ChannelTypes.GUILD_VOICE: {
        description.push(
          Basic.field(
            CustomEmojis.CHANNEL_VOICE,
            "Bitrate",
            `${formatBytes(
              channel.bitrate || 0,
              undefined,
              undefined,
              true
            )}/second`
          )
        );

        description.push(
          Basic.field(
            CustomEmojis.GUI_MEMBERS,
            "User Limit",
            `${channel.voiceStates.size}/${channel.userLimit}`
          )
        );

        if (channel.videoQualityMode) {
          description.push(
            Basic.field(
              CustomEmojis.GUI_VIDEO,
              "Video Quality",
              VideoQualityModesText[channel.videoQualityMode]
            )
          );
        }

        if (channel.stageInstance) {
          description.push(
            Basic.field(
              Emojis.WARNING,
              "Privacy",
              StagePrivacyLevelsText[channel.stageInstance.privacyLevel]
            )
          );
          description.push(
            Basic.field(
              CustomEmojis.GUI_MEMBERS,
              "Moderators",
              channel.stageInstance.moderators.size.toLocaleString()
            )
          );
          description.push(
            Basic.field(
              Emojis.MICROPHONE,
              "Speakers",
              channel.stageInstance.speakers.size.toLocaleString()
            )
          );
          description.push(
            Basic.field(
              Emojis.WAVE,
              "Listeners",
              channel.stageInstance.listeners.size.toLocaleString()
            )
          );
        }

        break;
      }

      case ChannelTypes.GUILD_CATEGORY: {
        description.push(
          Basic.field(
            CustomEmojis.CHANNEL_CATEGORY,
            "Children",
            channel.children.size.toLocaleString()
          )
        );
        break;
      }

      case ChannelTypes.GUILD_DIRECTORY: {
        break;
      }

      case ChannelTypes.GUILD_FORUM: {
        if (channel.defaultAutoArchiveDuration) {
          description.push(
            Basic.field(
              CustomEmojis.GUI_SLOWMODE,
              "Default Auto Archive Duration",
              buildTimestampString(channel.defaultAutoArchiveDuration)
            )
          );
        }

        if (channel.template) {
          description.push(
            Basic.field(
              CustomEmojis.GUI_RICH_PRESENCE,
              "Template",
              Markdown.Format.codestring(channel.template)
            )
          );
        }

        if (channel.availableTags.size) {
          description.push(
            Basic.field(
              CustomEmojis.CHANNEL_STORE,
              "Available Tags",
              channel.availableTags
                .map((x) => {
                  const title = Markdown.Format.codestring(
                    x.emojiId
                      ? x.name
                      : `${x.emojiName} ${Markdown.Format.codestring(x.name)}`
                  );
                  if (x.emojiId) {
                    return `<:${x.emojiName}:${x.emojiId}> ${title}`;
                  } else {
                    return title;
                  }
                })
                .join(", ")
            )
          );
        }

        break;
      }
    }

    if (description.length) {
      embed.addField(
        `${ChannelTypesText[channel.type]} Info`,
        description.join("\n")
      );
    }
  }

  return await editOrReply(context, { embed });
}
