import { Collections, Structures } from "detritus-client";

import { ImageFormats, MessageEmbedTypes } from "detritus-client/lib/constants";
export module Find {
  export interface FindMediaUrlOptions {
    audio?: boolean;
    image?: boolean;
    video?: boolean;
  }

  export const TRUSTED_URLS = [
    "cdn.discordapp.com",
    "images-ext-1.discordapp.net",
    "images-ext-2.discordapp.net",
    "media.discordapp.net",
  ];
  export function findImageUrlInAttachment(
    attachment: Structures.Attachment,
    as?: ImageFormats
  ): null | string {
    if (attachment.proxyUrl && (attachment.height || attachment.width)) {
      if (attachment.isImage) {
        if (attachment.url) {
          const url = new URL(attachment.url);
          if (TRUSTED_URLS.includes(url.host)) {
            return attachment.url;
          }
        }
        return attachment.proxyUrl;
      } else if (attachment.isVideo) {
        return attachment.proxyUrl + `?format=${as || ImageFormats.PNG}`;
      }
    }
    return null;
  }

  export function findImageUrlInEmbed(
    embed: Structures.MessageEmbed,
    ignoreGIFV = false,
    as?: ImageFormats
  ): null | string {
    if (!ignoreGIFV && embed.type === MessageEmbedTypes.GIFV) {
      // try to use our own unfurler for the url since it'll use the thumbnail
      // imgur returns the .gif image in thumbnail, so check if that ends with .gif
      const url = findImageUrlInEmbed(embed, true);
      if (url && url.endsWith(".gif")) {
        return url;
      }
      if (embed.url) {
        return embed.url;
      }
      return null;
    }
    const { image } = embed;
    if (image && image.proxyUrl && (image.height || image.width)) {
      if (image.url) {
        const url = new URL(image.url);
        if (TRUSTED_URLS.includes(url.host)) {
          return image.url;
        }
      }
      return image.proxyUrl;
    }
    const { thumbnail } = embed;
    if (
      thumbnail &&
      thumbnail.proxyUrl &&
      (thumbnail.height || thumbnail.width)
    ) {
      if (thumbnail.url) {
        const url = new URL(thumbnail.url);
        if (TRUSTED_URLS.includes(url.host)) {
          return thumbnail.url;
        }
      }
      return thumbnail.proxyUrl;
    }
    const { video } = embed;
    if (video && video.proxyUrl && (video.height || video.width)) {
      return video.proxyUrl + `?format=${as || ImageFormats.PNG}`;
    }
    return null;
  }

  export function findImageUrlInMessage(
    message: Structures.Message,
    url?: null | string,
    as?: ImageFormats
  ): null | string {
    if (url) {
      for (const [, embed] of message.embeds) {
        if (embed.url === url) {
          return findImageUrlInEmbed(embed, undefined, as);
        }
      }
    }
    for (const [, attachment] of message.attachments) {
      const url = findImageUrlInAttachment(attachment, as);
      if (url) {
        return url;
      }
    }
    for (const [, embed] of message.embeds) {
      const url = findImageUrlInEmbed(embed, undefined, as);
      if (url) {
        return url;
      }
    }
    for (const [, sticker] of message.stickerItems) {
      return sticker.assetUrl;
    }
    return null;
  }

  export function findImageUrlInMessages(
    messages:
      | Collections.BaseCollection<string, Structures.Message>
      | Array<Structures.Message>,
    as?: ImageFormats
  ): null | string {
    for (const message of messages.values()) {
      const url = findImageUrlInMessage(message, undefined, as);
      if (url) {
        return url;
      }
    }
    return null;
  }

  export function findImageUrlsInMessage(
    message: Structures.Message,
    as?: ImageFormats
  ): Array<string> {
    const urls = new Set<string>();
    for (const [, attachment] of message.attachments) {
      const url = findImageUrlInAttachment(attachment, as);
      if (url) {
        urls.add(url);
      }
    }
    for (const [, embed] of message.embeds) {
      const url = findImageUrlInEmbed(embed, undefined, as);
      if (url) {
        urls.add(url);
      }
    }
    for (const [, sticker] of message.stickerItems) {
      urls.add(sticker.assetUrl);
    }
    return urls.size ? Array.from(urls) : [];
  }

  export function findImageUrlsInMessages(
    messages:
      | Collections.BaseCollection<string, Structures.Message>
      | Array<Structures.Message>,
    as?: ImageFormats
  ): Array<string> {
    const urls = new Set<string>();
    for (const message of messages.values()) {
      const urlsFound = findImageUrlsInMessage(message, as);
      for (const url of urlsFound) {
        urls.add(url);
      }
    }
    return urls.size ? Array.from(urls) : [];
  }

  export interface FindMediaUrlOptions {
    audio?: boolean;
    image?: boolean;
    video?: boolean;
  }

  export function findMediaUrlInAttachment(
    attachment: Structures.Attachment,
    options?: FindMediaUrlOptions
  ): null | string {
    const findAudio = !options || options.audio || options.audio === undefined;
    const findImage = !options || options.image || options.image === undefined;
    const findVideo = !options || options.video || options.video === undefined;

    // Has proxy url
    // is Audio or is Image/Video w/ height or width
    if (attachment.proxyUrl) {
      if (attachment.isAudio && !findAudio) {
        return null;
      }
      if (
        attachment.isImage &&
        (!findImage || !(attachment.height || attachment.width))
      ) {
        return null;
      }
      if (
        attachment.isVideo &&
        (!findVideo || !(attachment.height || attachment.width))
      ) {
        return null;
      }
      if (attachment.url) {
        const url = new URL(attachment.url);
        if (TRUSTED_URLS.includes(url.host)) {
          return attachment.url;
        }
      }
      return attachment.proxyUrl;
    }
    return null;
  }

  export function findMediaUrlInEmbed(
    embed: Structures.MessageEmbed,
    ignoreGIFV = false,
    options?: FindMediaUrlOptions
  ): null | string {
    const findImage = !options || options.image || options.image === undefined;
    const findVideo = !options || options.video || options.video === undefined;

    if (!ignoreGIFV && embed.type === MessageEmbedTypes.GIFV && findImage) {
      // try to use our own unfurler for the url since it'll use the thumbnail
      // imgur returns the .gif image in thumbnail, so check if that ends with .gif
      const url = findImageUrlInEmbed(embed, true);
      if (url && url.endsWith(".gif")) {
        return url;
      }
      if (embed.url) {
        return embed.url;
      }
      return null;
    }
    const { image } = embed;
    if (image && image.proxyUrl && (image.height || image.width) && findImage) {
      if (image.url) {
        const url = new URL(image.url);
        if (TRUSTED_URLS.includes(url.host)) {
          return image.url;
        }
      }
      return image.proxyUrl;
    }
    const { thumbnail } = embed;
    if (
      thumbnail &&
      thumbnail.proxyUrl &&
      (thumbnail.height || thumbnail.width) &&
      findImage
    ) {
      if (thumbnail.url) {
        const url = new URL(thumbnail.url);
        if (TRUSTED_URLS.includes(url.host)) {
          return thumbnail.url;
        }
      }
      return thumbnail.proxyUrl;
    }
    const { video } = embed;
    if (video && video.proxyUrl && (video.height || video.width) && findVideo) {
      if (video.url) {
        const url = new URL(video.url);
        if (TRUSTED_URLS.includes(url.host)) {
          return video.url;
        }
      }
      return video.proxyUrl;
    }
    return null;
  }

  export function findMediaUrlInMessage(
    message: Structures.Message,
    url?: null | string,
    options?: FindMediaUrlOptions
  ): null | string {
    const findImage = !options || options.image || options.image === undefined;

    if (url) {
      for (const [, embed] of message.embeds) {
        if (embed.url === url) {
          return findMediaUrlInEmbed(embed, false, options);
        }
      }
    }
    for (const [, attachment] of message.attachments) {
      const url = findMediaUrlInAttachment(attachment, options);
      if (url) {
        return url;
      }
    }
    for (const [, embed] of message.embeds) {
      const url = findMediaUrlInEmbed(embed, false, options);
      if (url) {
        return url;
      }
    }
    if (findImage) {
      for (const [, sticker] of message.stickerItems) {
        return sticker.assetUrl;
      }
    }
    return null;
  }

  export function findMediaUrlInMessages(
    messages:
      | Collections.BaseCollection<string, Structures.Message>
      | Array<Structures.Message>,
    options?: FindMediaUrlOptions
  ): null | string {
    for (const message of messages.values()) {
      const url = findMediaUrlInMessage(message, null, options);
      if (url) {
        return url;
      }
    }
    return null;
  }

  export function findMediaUrlsInMessage(
    message: Structures.Message,
    options?: FindMediaUrlOptions
  ): Array<string> {
    const findImage = !options || options.image || options.image === undefined;

    const urls = new Set<string>();
    for (const [, attachment] of message.attachments) {
      const url = findMediaUrlInAttachment(attachment, options);
      if (url) {
        urls.add(url);
      }
    }
    for (const [, embed] of message.embeds) {
      const url = findMediaUrlInEmbed(embed, false, options);
      if (url) {
        urls.add(url);
      }
    }
    if (findImage) {
      for (const [, sticker] of message.stickerItems) {
        urls.add(sticker.assetUrl);
      }
    }
    return urls.size ? Array.from(urls) : [];
  }

  export function findMediaUrlsInMessages(
    messages:
      | Collections.BaseCollection<string, Structures.Message>
      | Array<Structures.Message>,
    options?: FindMediaUrlOptions
  ): Array<string> {
    const urls = new Set<string>();
    for (const message of messages.values()) {
      const urlsFound = findMediaUrlsInMessage(message, options);
      for (const url of urlsFound) {
        urls.add(url);
      }
    }
    return urls.size ? Array.from(urls) : [];
  }
}
