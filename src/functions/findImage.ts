import { Collections, Structures } from "detritus-client";
import { ParsedArgs } from "detritus-client/lib/command";
import { MessageEmbedTypes } from "detritus-client/lib/constants";
import { Sticker } from "detritus-client/lib/structures";
import { Context } from "vm";
import { findEmoji } from "./findEmoji";
import { findUser } from "./findUser";
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
export async function findImage(context: Context, _args: ParsedArgs, type: string = 'png') {
  const query: string | undefined = _args[context.command!.label];

  if (!query)
    return findImageUrlInMessages(
      await context.channel?.fetchMessages({ limit: 100 })
    );

  const userTry = await findUser(query);
  if (userTry) return userTry.avatarUrlFormat(type);

  const emojiTry = findEmoji(query);
  if (emojiTry) return emojiTry.url;

  return query;
}
