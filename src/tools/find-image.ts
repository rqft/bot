import { Collections, Command, Interaction, Structures } from "detritus-client";
import {
  DiscordAbortCodes,
  ImageFormats,
  MessageEmbedTypes,
} from "detritus-client/lib/constants";
import { splitTextToDiscordHandle } from "./tools";

export module Find {
  export enum Formats {
    MP3 = "mp3",
    OGG = "ogg",
    WAV = "wav",
    FLAC = "flac",

    PNG = "png",
    JPG = "jpg",
    JPEG = "jpeg",
    GIF = "gif",
    WEBP = "webp",

    MP4 = "mp4",
    WEBM = "webm",
    MOV = "mov",
  }

  export interface FindUrlOptions {
    audio?: boolean;
    image?: boolean;
    video?: boolean;
    format?: Formats | ImageFormats;
  }

  export const TRUSTED_URLS = [
    "cdn.discordapp.com",
    "images-ext-1.discordapp.net",
    "images-ext-2.discordapp.net",
    "media.discordapp.net",
  ];

  export async function fetchMemberOrUserById(
    context: Command.Context | Interaction.InteractionContext,
    userId: string,
    memberOnly = false
  ): Promise<Structures.Member | Structures.User | null> {
    if (context.user.id === userId) {
      if (memberOnly) {
        if (context.member) {
          return context.member;
        }
      } else {
        return context.member || context.user;
      }
    }

    if (context instanceof Command.Context) {
      const mention = context.message.mentions.get(userId);
      if (mention) {
        if (memberOnly) {
          if (mention instanceof Structures.Member) {
            return mention;
          }
        } else {
          return mention;
        }
      }
    }

    try {
      const { guild } = context;
      if (guild) {
        const member = guild.members.get(userId);
        if (member) {
          if (member.isPartial) {
            return await guild.fetchMember(userId);
          }
          return member;
        }
        return await guild.fetchMember(userId);
      }
      if (memberOnly) {
        return null;
      }
      if (context.users.has(userId)) {
        return context.users.get(userId) as Structures.User;
      }
      return await context.rest.fetchUser(userId);
    } catch (error) {
      // UNKNOWN_MEMBER == userId exists
      // UNKNOWN_USER == userId doesn't exist
      switch ((error as { code: number }).code) {
        case DiscordAbortCodes.UNKNOWN_MEMBER: {
          if (memberOnly) {
            return null;
          }
          return await context.rest.fetchUser(userId);
        }
        case DiscordAbortCodes.UNKNOWN_USER: {
          return null;
        }
        default: {
          throw error;
        }
      }
    }
  }

  export function findImageUrlInAttachment(
    attachment: Structures.Attachment,
    format?: Formats | ImageFormats
  ): null | string {
    if (attachment.proxyUrl && (attachment.height || attachment.width)) {
      if (format && attachment.extension !== format) {
        return null;
      }
      if (attachment.isImage) {
        if (attachment.url) {
          const url = new URL(attachment.url);
          if (TRUSTED_URLS.includes(url.host)) {
            return attachment.url;
          }
        }
        return attachment.proxyUrl;
      } else if (attachment.isVideo) {
        return attachment.proxyUrl + "?format=" + (format || "png");
      }
    }
    return null;
  }

  export function findImageUrlInEmbed(
    embed: Structures.MessageEmbed,
    ignoreGIFV = false,
    format?: Formats | ImageFormats
  ): null | string {
    if (!ignoreGIFV && embed.type === MessageEmbedTypes.GIFV) {
      // try to use our own unfurler for the url since it'll use the thumbnail
      // imgur returns the .gif image in thumbnail, so check if that ends with .gif
      const url = findImageUrlInEmbed(embed, true, format);
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
      return video.proxyUrl + "?format=png";
    }
    return null;
  }

  export function findImageUrlInMessage(
    message: Structures.Message,
    url?: null | string,
    format?: Formats | ImageFormats
  ): null | string {
    if (url) {
      for (let [, embed] of message.embeds) {
        if (embed.url === url) {
          return findImageUrlInEmbed(embed, undefined, format);
        }
      }
    }
    for (let [, attachment] of message.attachments) {
      const url = findImageUrlInAttachment(attachment, format);
      if (url) {
        return url;
      }
    }
    for (let [, embed] of message.embeds) {
      const url = findImageUrlInEmbed(embed, undefined, format);
      if (url) {
        return url;
      }
    }
    for (let [, sticker] of message.stickerItems) {
      return sticker.assetUrl;
    }
    return null;
  }

  export function findImageUrlInMessages(
    messages:
      | Collections.BaseCollection<string, Structures.Message>
      | Array<Structures.Message>,
    format?: Formats | ImageFormats
  ): null | string {
    for (const message of messages.values()) {
      const url = findImageUrlInMessage(message, null, format);
      if (url) {
        return url;
      }
    }
    return null;
  }

  export function findImageUrlsInMessage(
    message: Structures.Message,
    format?: Formats | ImageFormats
  ): Array<string> {
    const urls = new Set<string>();
    for (let [, attachment] of message.attachments) {
      const url = findImageUrlInAttachment(attachment, format);
      if (url) {
        urls.add(url);
      }
    }
    for (let [, embed] of message.embeds) {
      const url = findImageUrlInEmbed(embed, undefined, format);
      if (url) {
        urls.add(url);
      }
    }
    for (let [, sticker] of message.stickerItems) {
      urls.add(sticker.assetUrl);
    }
    return urls.size ? Array.from(urls) : [];
  }

  export function findImageUrlsInMessages(
    messages:
      | Collections.BaseCollection<string, Structures.Message>
      | Array<Structures.Message>,
    format?: Formats | ImageFormats
  ): Array<string> {
    const urls = new Set<string>();
    for (const message of messages.values()) {
      const urlsFound = findImageUrlsInMessage(message, format);
      for (let url of urlsFound) {
        urls.add(url);
      }
    }
    return urls.size ? Array.from(urls) : [];
  }

  export interface FindMediaUrlOptions {
    audio?: boolean;
    image?: boolean;
    video?: boolean;
    format?: Formats | ImageFormats;
  }

  export function findMediaUrlInAttachment(
    attachment: Structures.Attachment,
    options?: FindMediaUrlOptions
  ): null | string {
    const findAudio = !options || options.audio || options.audio === undefined;
    const findImage = !options || options.image || options.image === undefined;
    const findVideo = !options || options.video || options.video === undefined;

    if (options && options.format) {
      if (attachment.extension !== options.format) {
        return null;
      }
    }

    if (attachment.proxyUrl) {
      // Has proxy url
      // is Audio or is Image/Video w/ height or width
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
      if (options && options.format) {
        if (options.format !== Formats.GIF) {
          return null;
        }
      }

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
      for (let [, embed] of message.embeds) {
        if (embed.url === url) {
          return findMediaUrlInEmbed(embed, false, options);
        }
      }
    }
    for (let [, attachment] of message.attachments) {
      const url = findMediaUrlInAttachment(attachment, options);
      if (url) {
        return url;
      }
    }
    for (let [, embed] of message.embeds) {
      const url = findMediaUrlInEmbed(embed, false, options);
      if (url) {
        return url;
      }
    }
    if (findImage) {
      for (let [, sticker] of message.stickerItems) {
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
    for (let [, attachment] of message.attachments) {
      const url = findMediaUrlInAttachment(attachment, options);
      if (url) {
        urls.add(url);
      }
    }
    for (let [, embed] of message.embeds) {
      const url = findMediaUrlInEmbed(embed, false, options);
      if (url) {
        urls.add(url);
      }
    }
    if (findImage) {
      for (let [, sticker] of message.stickerItems) {
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
      for (let url of urlsFound) {
        urls.add(url);
      }
    }
    return urls.size ? Array.from(urls) : [];
  }

  /** Member Chunking */

  export async function findMemberByChunk(
    context: Command.Context | Interaction.InteractionContext,
    username: string,
    discriminator?: null | string
  ): Promise<Structures.Member | Structures.User | null> {
    const voiceChannel = context.voiceChannel;
    if (voiceChannel) {
      const members = voiceChannel.members;
      if (members) {
        const found = findMemberByUsername(members, username, discriminator);
        if (found) {
          return found;
        }
      }
    }

    const guild = context.guild;
    if (guild && !guild.isReady) {
      // await guild.requestMembers({
      //   limit: 0,
      //   presences: true,
      //   query: "",
      //   timeout: 10000,
      // });
    }

    const { channel } = context;
    if (channel) {
      const { messages } = channel;
      if (messages) {
        for (let [, message] of messages) {
          {
            const members = [message.member, message.author].filter((v) => v);
            const found = findMemberByUsername(
              members,
              username,
              discriminator
            );
            if (found) {
              return found;
            }
          }
          {
            const members = message.mentions;
            const found = findMemberByUsername(
              members,
              username,
              discriminator
            );
            if (found) {
              return found;
            }
          }
        }
      }
      {
        // incase its a dm
        const found = findMemberByUsername(
          channel.recipients,
          username,
          discriminator
        );
        if (found) {
          return found;
        }
      }
      {
        if (guild) {
          const channelMembers = channel.members;

          const members = findMembersByUsername(
            channelMembers,
            username,
            discriminator
          ) as Array<Structures.Member>;
          if (members.length) {
            const sorted = members.sort((x, y) => {
              if (x.hoistedRole && y.hoistedRole) {
                return y.hoistedRole.position - x.hoistedRole.position;
              } else if (x.hoistedRole) {
                return -1;
              } else if (y.hoistedRole) {
                return 1;
              }
              return 0;
            });
            return sorted[0]!;
          }
        }
      }
    }

    if (guild) {
      // find via guild cache

      const members = findMembersByUsername(
        guild.members,
        username,
        discriminator
      ) as Array<Structures.Member>;
      // add isPartial check (for joinedAt value?)
      if (members.length) {
        const sorted = members.sort((x, y) => {
          if (x.hoistedRole && y.hoistedRole) {
            return y.hoistedRole.position - x.hoistedRole.position;
          } else if (x.hoistedRole) {
            return -1;
          } else if (y.hoistedRole) {
            return 1;
          }
          return 0;
        });
        return sorted[0]!;
      }
    } else {
      // we are in a DM, check our channel's recipients first
      /*
      const channel = (context.channel) ? context.channel : await context.rest.fetchChannel(context.channelId);
      const found = findMembersByUsername(channel.recipients, username, discriminator);
      if (found.length) {
        return found;
      }
      */

      // assume this is a 1 on 1 DM since bots are not supported in Group DMs
      {
        const found = findMemberByUsername(
          [context.user, context.client.user || undefined],
          username,
          discriminator
        );
        if (found) {
          return found;
        }
      }

      // check our users cache since this is from a dm...
      /*
      {
        const found = findMemberByUsername(context.users, username, discriminator);
        if (found) {
          return found;
        }
      }
      */
    }
    return null;
  }

  export async function findMemberByChunkText(
    context: Command.Context | Interaction.InteractionContext,
    text: string
  ) {
    const [username, discriminator] = splitTextToDiscordHandle(text);
    return await findMemberByChunk(context, username, discriminator);
  }

  export async function findMembersByChunk(
    context: Command.Context | Interaction.InteractionContext,
    username: string,
    discriminator?: null | string
  ): Promise<Array<Structures.Member | Structures.User>> {
    const guild = context.guild;
    if (guild) {
      if (!guild.isReady) {
        // await guild.requestMembers({
        //   limit: 0,
        //   presences: true,
        //   query: "",
        //   timeout: 10000,
        // });
      }
      // find via guild cache
      const found = findMembersByUsername(
        guild.members,
        username,
        discriminator
      );
      if (found.length) {
        return found;
      }
    } else {
      // we are in a DM, check our channel's recipients first
      /*
      const channel = (context.channel) ? context.channel : await context.rest.fetchChannel(context.channelId);
      const found = findMembersByUsername(channel.recipients, username, discriminator);
      if (found.length) {
        return found;
      }
      */

      // assume this is a 1 on 1 DM since bots are not supported in Group DMs
      const found = findMembersByUsername(
        [context.user, context.client.user || undefined],
        username,
        discriminator
      );
      if (found.length) {
        return found;
      }

      // check our users cache since this is from a dm...
      // return findMembersByUsername(context.users, username, discriminator);
    }
    return [];
  }

  export async function findMembersByChunkText(
    context: Command.Context | Interaction.InteractionContext,
    text: string
  ) {
    const [username, discriminator] = splitTextToDiscordHandle(text);
    return await findMembersByChunk(context, username, discriminator);
  }

  /** Member Cache Filtering */

  export interface FindMemberByUsernameCache {
    values(): IterableIterator<Structures.Member | Structures.User | undefined>;
  }

  export function findMemberByUsername(
    members: FindMemberByUsernameCache,
    username: string,
    discriminator?: null | string
  ): Structures.Member | Structures.User | undefined {
    for (const memberOrUser of members.values()) {
      if (memberOrUser) {
        if (discriminator) {
          if (
            memberOrUser.username.toLowerCase().startsWith(username) &&
            memberOrUser.discriminator === discriminator
          ) {
            return memberOrUser;
          }
        } else {
          const nameMatches = memberOrUser.names.some((n: string) =>
            n.toLowerCase().startsWith(username)
          );
          if (nameMatches) {
            return memberOrUser;
          }
        }
      }
    }
  }

  export function findMembersByUsername(
    members: FindMemberByUsernameCache,
    username: string,
    discriminator?: null | string
  ): Array<Structures.Member | Structures.User> {
    const found: Array<Structures.Member | Structures.User> = [];
    for (const memberOrUser of members.values()) {
      if (memberOrUser) {
        if (discriminator) {
          if (
            memberOrUser.username.toLowerCase().startsWith(username) &&
            memberOrUser.discriminator === discriminator
          ) {
            found.push(memberOrUser);
          }
        } else {
          const nameMatches = memberOrUser.names.some((n: string) =>
            n.toLowerCase().startsWith(username)
          );
          if (nameMatches) {
            found.push(memberOrUser);
          }
        }
      }
    }
    return found;
  }
}
