import { Channel } from "detritus-client/lib/structures";
import { CustomEmojis } from "../enums/customEmojis";

export const getChannelEmoji = (channel: Channel): CustomEmojis =>
  channel.isDm
    ? channel.isDmGroup
      ? CustomEmojis.GUI_MEMBERS
      : channel.isDmSingle
      ? CustomEmojis.CHANNEL_THREAD
      : CustomEmojis.CHANNEL_THREAD_NEW
    : channel.isGuildCategory
    ? CustomEmojis.CHANNEL_CATEGORY
    : channel.isGuildNews
    ? CustomEmojis.CHANNEL_NEWS
    : channel.isGuildStageVoice
    ? CustomEmojis.CHANNEL_STAGE
    : channel.isGuildStore
    ? CustomEmojis.CHANNEL_STORE
    : channel.isText
    ? channel.isGuildText
      ? channel.nsfw
        ? CustomEmojis.CHANNEL_TEXT_NSFW
        : CustomEmojis.CHANNEL_TEXT
      : CustomEmojis.CHANNEL_THREAD_NEW
    : channel.isVoice
    ? channel.isGuildVoice
      ? CustomEmojis.CHANNEL_VOICE
      : CustomEmojis.GUI_START_CALL
    : CustomEmojis.GUI_HELP;
