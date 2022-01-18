import { Collections, Structures } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { MessageEmbedTypes } from "detritus-client/lib/constants";
import { Sticker } from "detritus-client/lib/structures";
import { Parameters } from "./parameters";
export const TRUSTED_URLS = Object.freeze([
  "cdn.discordapp.com",
  "images-ext-1.discordapp.net",
  "images-ext-2.discordapp.net",
  "media.discordapp.net",
]);
export function findImageUrlInAttachment(
  attachment: Structures.Attachment
): null | string {
  if (
    attachment.isImage &&
    attachment.proxyUrl &&
    (attachment.height || attachment.width)
  )
    if (attachment.url) {
      const url = new URL(attachment.url);
      if (TRUSTED_URLS.includes(url.host)) return attachment.url;
    } else return attachment.proxyUrl;
  return null;
}

export function findImageUrlInEmbed(
  embed: Structures.MessageEmbed,
  ignoreGIFV: boolean = false
): null | string {
  if (!ignoreGIFV && embed.type === MessageEmbedTypes.GIFV) {
    const url = findImageUrlInEmbed(embed, true);
    if (url && url.endsWith(".gif")) return url;
    if (embed.url) return embed.url;
    return null;
  }
  const { image } = embed;
  if (image && image.proxyUrl && (image.height || image.width))
    if (image.url) {
      const url = new URL(image.url);
      if (TRUSTED_URLS.includes(url.host)) return image.url;
    } else return image.proxyUrl;
  const { thumbnail } = embed;
  if (thumbnail && thumbnail.proxyUrl && (thumbnail.height || thumbnail.width))
    if (thumbnail.url) {
      const url = new URL(thumbnail.url);
      if (TRUSTED_URLS.includes(url.host)) return thumbnail.url;
    } else return thumbnail.proxyUrl;
  return null;
}

export function findImageUrlInMessage(
  message: Structures.Message,
  url?: string
): null | string {
  if (url)
    for (let [_embedId, embed] of message.embeds)
      if (embed.url === url) return findImageUrlInEmbed(embed);
  for (let [_attachmentId, attachment] of message.attachments) {
    const url = findImageUrlInAttachment(attachment);
    if (url) return url;
  }
  for (let [_embedId, embed] of message.embeds) {
    const url = findImageUrlInEmbed(embed);
    if (url) return url;
  }
  for (let [_stickerId, sticker] of message.stickers)
    return getStickerUrl(sticker);
  return null;
}

export function findImageUrlInMessages(
  messages:
    | Collections.BaseCollection<string, Structures.Message>
    | Array<Structures.Message>
): null | string {
  for (const message of messages.values())
    if (findImageUrlInMessage(message)) return findImageUrlInMessage(message);
  return null;
}
export function getStickerUrl(sticker: Sticker) {
  return `https://distok.top/stickers/${sticker.packId}/${sticker.id}.gif`;
}
export async function findImage(
  context: Context,
  query?: string,
  type: string = "gif"
) {
  if (!query)
    return findImageUrlInMessages(
      (await context.channel?.fetchMessages({ limit: 100 })) ?? []
    );

  const urly =
    /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

  const urlTry = urly.test(query);
  if (urlTry) return query;
  const userTry = await Parameters.user(query, context);
  if (userTry) return userTry.avatarUrlFormat(type, { size: 1024 });

  const emojiTry = Parameters.emojiImage(query);
  if (emojiTry) return emojiTry.url;

  throw new Error("unable to find image");
}
