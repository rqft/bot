import { Context } from 'detritus-client/lib/command';
import {
  DiscordRegexNames,
  StickerFormats,
} from 'detritus-client/lib/constants';
import { EmbeddableRegexes, Message } from 'detritus-client/lib/structures';
import { regex } from 'detritus-client/lib/utils';
import { CommandArgumentBuilders } from '../wrap/builder';
import { CustomEmoji } from './emoji';
import { fileExtension } from './util';

export enum MediaType {
  Audio = 'Audio',
  Video = 'Video',
  Image = 'Image',
}

export type MediaTypes = MediaType | `${MediaType}`;

export const AllMediaTypes = [
  MediaType.Audio,
  MediaType.Image,
  MediaType.Video,
];

export async function findMediaUrls(
  type: Array<MediaTypes>,
  context: Context | Message,
  text: string | undefined
): Promise<Array<string>> {
  if (context instanceof Context) {
    context = context.message;
  }

  const canBeAudio = type.includes(MediaType.Audio);
  const canBeVideo = type.includes(MediaType.Video);
  const canBeImage = type.includes(MediaType.Image);

  const out: Array<string> = [];
  for (const [, attachment] of context.attachments) {
    if (
      (canBeAudio && attachment.isAudio) ||
      (canBeVideo && attachment.isVideo) ||
      (canBeImage && attachment.isImage)
    ) {
      out.push(attachment.url);
    }
  }

  if (context.referencedMessage) {
    out.push(
      ...(await findMediaUrls(type, context.referencedMessage, context.content))
    );
  }

  for (const [, embed] of context.embeds) {
    if (canBeImage && embed.image && embed.image.url) {
      out.push(embed.image.url);
    }
  }

  for (const [, stickerItem] of context.stickerItems) {
    if (canBeImage && stickerItem.formatType === StickerFormats.PNG) {
      out.push(stickerItem.assetUrl);
    }
  }

  if (text) {
    const urls = regex(DiscordRegexNames.TEXT_URL, text);

    for (const { text } of urls.matches) {
      if (text === undefined) {
        continue;
      }
      if (canBeAudio && EmbeddableRegexes.audio.test(fileExtension(text))) {
        out.push(text);
      }

      if (canBeImage && EmbeddableRegexes.image.test(fileExtension(text))) {
        out.push(text);
      }

      if (canBeVideo && EmbeddableRegexes.video.test(fileExtension(text))) {
        out.push(text);
      }
    }

    try {
      const id = await CommandArgumentBuilders.user()(text, context as never);
      console.log(id);

      if (canBeImage) {
        out.push(
          id.avatarUrlFormat(null, { size: 1024 }) || id.defaultAvatarUrl
        );
      }
    } catch {
      void 0;
    }

    const emojis = regex(DiscordRegexNames.EMOJI, text);

    for (const { matched } of emojis.matches) {
      if (canBeImage) {
        out.push(CustomEmoji.url(matched));
      }
    }
  }

  return out;
}
