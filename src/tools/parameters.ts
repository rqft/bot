import { Command, Interaction, Structures } from "detritus-client";
import { Endpoints } from "detritus-client-rest";
import { Context } from "detritus-client/lib/command";
import {
  ChannelTypes,
  DiscordRegexNames,
  GuildExplicitContentFilterTypes,
  ImageFormats,
} from "detritus-client/lib/constants";
import {
  InteractionAutoCompleteContext,
  InteractionContext,
} from "detritus-client/lib/interaction";
import { regex as discordRegex } from "detritus-client/lib/utils";
import { Timers } from "detritus-utils";
import { UNICODE_EMOJI_REGEX } from "../constants";
import { VyboseEndpoints } from "../endpoints";
import { client, selfclient } from "../globals";
import { Err } from "./error";
import { Find } from "./find-image";
import { Markdown } from "./markdown";
import {
  isSnowflake,
  onlyEmoji,
  toCodePointForTwemoji,
  validateUrl,
} from "./tools";

export module Parameters {
  export function array<T>(use: (value: string) => T, split = "|") {
    return function (value: string): Array<T> {
      return value
        .split(split)
        .map((x) => x.trim())
        .map(use);
    };
  }

  export function codeblock(value: string): {
    language?: string;
    text: string;
  } {
    const { matches } = discordRegex(
      DiscordRegexNames.TEXT_CODEBLOCK,
      value
    ) as {
      matches: Array<{ language?: string; text: string }>;
    };
    if (matches.length && matches[0]) {
      return matches[0];
    }
    return { text: value };
  }
  export interface NumberOptions {
    max?: number;
    min?: number;
    int?: boolean;
  }

  export function number(options: NumberOptions = {}) {
    return (valueStrOrNum: number | string): number => {
      console.log(valueStrOrNum);
      let value = parseFloat(valueStrOrNum as string);
      if (isNaN(value)) {
        throw new Err("wasn't a number", { status: 400 });
      }
      if (options.int === true) {
        value = Math.floor(value);
      }
      if (options.max !== undefined && options.min !== undefined) {
        if (value < options.min || options.max < value) {
          throw new Err(`must be between ${options.min} and ${options.max}`);
        }
      } else if (options.max !== undefined) {
        if (options.max < value) {
          throw new Err(`must be less than ${options.max}`, { status: 400 });
        }
      } else if (options.min !== undefined) {
        if (value < options.min) {
          throw new Err(`must be more than ${options.min}`, { status: 400 });
        }
      }
      return value;
    };
  }

  export function percentage(value: number | string): number {
    if (typeof value === "string") {
      value = value.replace(/%/g, "");
    }
    const percentage = parseFloat(value as string);
    if (isNaN(percentage)) {
      return percentage;
    }
    return Math.max(0, Math.min(percentage / 100));
  }

  export function snowflake(value: string): string {
    if (!isSnowflake(value)) {
      throw new Err("wasn't a valid snowflake", { status: 400 });
    }
    return value;
  }

  export function url(value: string): URL {
    if (value) {
      if (!/^https?:\/\//.test(value)) {
        value = `http://${value}`;
      }
      if (!validateUrl(value)) {
        throw new Err("wasn't a valid url", { status: 400 });
      }
    }
    return new URL(value);
  }

  export interface EmojiOptions {
    unicode?: boolean;
  }
  export function emoji(options: EmojiOptions = {}) {
    return (value: string): string => {
      if (options.unicode) {
        if (!UNICODE_EMOJI_REGEX.test(value)) {
          throw new Err("wasn't a valid unicode emoji", { status: 400 });
        }

        return value;
      }
      const matched = Markdown.Match.emoji(value);
      if (matched.matches.length === 0) {
        throw new Err("wasn't a valid emoji", { status: 400 });
      }

      return value;
    };
  }
  export enum EmojiType {
    TWEMOJI = "twemoji",
    CUSTOM = "custom",
  }
  export interface EmojiUrl {
    url: string;
    type: EmojiType;
    id?: string;
    raw: string;
  }
  export function emojiUrl(value: string): EmojiUrl | null {
    value = value.toLowerCase().trim();
    if (UNICODE_EMOJI_REGEX.test(value)) {
      const points = toCodePointForTwemoji(value);
      const url = `https://cdn.notsobot.com/twemoji/512x512/${points}.png`;
      return { url, type: EmojiType.TWEMOJI, raw: points };
    }

    const matches = Markdown.Match.emoji(value);
    if (matches.matches.length === 0) {
      return null;
    }

    const emoji = matches.matches[0]!;
    return {
      url:
        Endpoints.Urls.CDN.slice(0, -1) +
        Endpoints.CDN.EMOJI(
          emoji.id,
          emoji.animated ? ImageFormats.GIF : ImageFormats.PNG
        ),
      type: EmojiType.CUSTOM,
      id: emoji.id,
      raw: value,
    };
  }
  export async function user(
    value: string,
    _context: Context | InteractionContext
  ): Promise<Structures.User | undefined> {
    if (!value) {
      return Parameters.Default.author(_context);
    }
    const found = [client, selfclient]
      .map((v) => v.users.toArray())
      .flat(1)
      .find((key) => {
        return (
          key.username.toLowerCase().includes(value.toLowerCase()) ||
          key.toString().toLowerCase() === value.toLowerCase() ||
          key.id === value.replace(/\D/g, "")
        );
      });
    if (!found) {
      try {
        const fetchy = await client.rest.fetchUser(value.replace(/\D/g, ""));
        if (fetchy) {
          return fetchy;
        }
      } catch (e) {
        throw new Err("not found", { status: 404 });
      }
    }
    return found;
  }
  export interface ChannelOptions {
    inGuild?: boolean;
    types?: Array<ChannelTypes>;
  }

  export function channel(
    options: ChannelOptions = {}
  ): (
    value: string,
    context: Command.Context | Interaction.InteractionContext
  ) => Structures.Channel | null {
    options = Object.assign({ inGuild: true }, options);
    return (
      value: string,
      context: Command.Context | Interaction.InteractionContext
    ): Structures.Channel | null => {
      if (!value) {
        return Parameters.Default.channel(context);
      }
      if (value) {
        {
          const { matches } = discordRegex(
            DiscordRegexNames.MENTION_CHANNEL,
            value
          ) as { matches: Array<{ id: string }> };
          if (matches.length) {
            const { id: channelId } = matches[0]!;
            const channel = context.channels.get(channelId);
            if (
              channel &&
              (!options.types || options.types.includes(channel.type))
            ) {
              if (!options.inGuild || channel.guildId === context.guildId) {
                return channel;
              }
              return null;
            }
          }
        }
        if (isSnowflake(value)) {
          const channel = context.channels.get(value);
          if (
            channel &&
            (!options.types || options.types.includes(channel.type))
          ) {
            if (!options.inGuild || channel.guildId === context.guildId) {
              return channel;
            }
            return null;
          }
        }
        const { guild } = context;
        if (guild) {
          let channels: Array<Structures.Channel>;

          const { types: channelTypes } = options;
          if (channelTypes) {
            channels = guild.channels.filter((channel) =>
              channelTypes.includes(channel.type)
            );
          } else {
            channels = guild.channels.toArray();
          }
          channels = channels.sort(
            (x, y) => (x.position || 0) - (y.position || 0)
          );
          for (const channel of channels) {
            if (channel.name.toLowerCase().startsWith(value)) {
              return channel;
            }
          }
          for (const channel of channels) {
            if (channel.name.toLowerCase().includes(value)) {
              return channel;
            }
          }
        }
      }
      return null;
    };
  }

  export function channels(
    options: ChannelOptions = {}
  ): (
    value: string,
    context: Command.Context | Interaction.InteractionContext
  ) => Array<Structures.Channel> {
    const findChannel = channel(options);
    return (
      value: string,
      context: Command.Context | Interaction.InteractionContext
    ): Array<Structures.Channel> => {
      if (value) {
        const channels: Array<Structures.Channel> = [];
        for (const arg of stringArguments(value)) {
          const found = findChannel(arg, context);
          if (found) {
            channels.push(found);
          }
        }
        return channels;
      }
      return [];
    };
  }

  export function role(
    value: string,
    context: Context | InteractionContext
  ): Structures.Role | null {
    if (value) {
      const { guild } = context;
      if (guild) {
        {
          const { matches } = discordRegex(
            DiscordRegexNames.MENTION_ROLE,
            value
          ) as {
            matches: Array<{ id: string }>;
          };
          if (matches.length) {
            const { id: roleId } = matches[0]!;
            const role = guild.roles.get(roleId);
            if (role) {
              return role;
            }
          }
        }
        if (isSnowflake(value)) {
          const role = guild.roles.get(value);
          if (role) {
            return role;
          }
        }
        value = value.toLowerCase();
        for (const [, role] of guild.roles) {
          if (role.name.toLowerCase().startsWith(value)) {
            return role;
          }
        }
        for (const [, role] of guild.roles) {
          if (role.name.toLowerCase().includes(value)) {
            return role;
          }
        }
      }
    }
    return Default.defaultRole(context);
  }

  export async function guild(
    value: string,
    context: Context | InteractionContext
  ): Promise<Structures.Guild | null> {
    if (!value) {
      return Parameters.Default.guild(context);
    }
    if (isSnowflake(value)) {
      const guild = client.guilds.get(value) || selfclient.guilds.get(value);
      if (guild) {
        return guild;
      } else {
        try {
          return client.rest.fetchGuild(value, {}, true);
        } catch {
          try {
            return selfclient.rest.fetchGuild(value, {}, true);
          } catch {
            return null;
          }
        }
      }
    }

    const guilds = selfclient.guilds.clone();

    // add actual guilds the bot is in
    client.guilds.forEach((value, key) => {
      guilds.set(key, value);
    });

    for (const [, guild] of guilds) {
      if (guild.name.toLowerCase().startsWith(value)) {
        return guild;
      } else if (guild.name.toLowerCase().includes(value)) {
        return guild;
      }
    }

    return null;
  }

  export const QuotesAll = {
    '"': '"',
    "'": "'",
    "’": "’",
    "‚": "‛",
    "“": "”",
    "„": "‟",
    "「": "」",
    "『": "』",
    "〝": "〞",
    "﹁": "﹂",
    "﹃": "﹄",
    "＂": "＂",
    "｢": "｣",
    "«": "»",
    "《": "》",
    "〈": "〉",
  };

  export const Quotes = {
    END: Object.values(QuotesAll),
    START: Object.keys(QuotesAll),
  };

  export function stringArguments(value: string): Array<string> {
    const results: Array<string> = [];
    while (value.length) {
      let result = value.slice(0, 1);
      value = value.slice(1);

      // check to see if this word starts with any of the quote starts
      // if yes, then continue onto the next word
      if (Quotes.START.includes(result)) {
        const index = value.indexOf(
          (QuotesAll as Record<string, string>)[result]!,
          1
        );
        if (index !== -1) {
          result = value.slice(0, index);
          value = value.slice(index + 1).trim();
          results.push(result);
          continue;
        }
      }
      // check for the next space, if not then we consume the whole thing
      const index = value.indexOf(" ");
      if (index === -1) {
        result += value.slice(0, value.length);
        value = "";
      } else {
        result += value.slice(0, index);
        value = value.slice(index).trim();
      }
      results.push(result);
    }
    return results;
  }

  export function mediaUrl(
    options: Find.FindMediaUrlOptions = {}
  ): (
    x: string,
    context: Command.Context | Interaction.InteractionContext
  ) => Promise<string | null | undefined> {
    const customLastMediaUrl = Parameters.Default.mediaUrl(options);

    return async (
      value: string,
      context: Command.Context | Interaction.InteractionContext
    ) => {
      try {
        if (context instanceof Command.Context) {
          // check the message's attachments/stickers first
          {
            const url = Find.findMediaUrlInMessages([context.message], options);
            if (url) {
              return url;
            }
          }

          // check for reply and if it has an image
          {
            const { messageReference } = context.message;
            if (messageReference && messageReference.messageId) {
              const message =
                messageReference.message ||
                (await context.rest.fetchMessage(
                  messageReference.channelId,
                  messageReference.messageId
                ));
              const url = Find.findMediaUrlInMessages([message], options);
              if (url) {
                return url;
              }
            }
          }
        }

        if (value) {
          // get last image then
          if (value === "^") {
            return (await customLastMediaUrl(context)) || undefined;
          }

          // if it's a url
          {
            const { matches } = discordRegex(
              DiscordRegexNames.TEXT_URL,
              value
            ) as { matches: Array<{ text: string }> };
            if (matches.length) {
              const { text } = matches[0]!;

              // if its https://discord.com/channels/:guildId/:channelId/:messageId
              {
                const messageLink = discordRegex(
                  DiscordRegexNames.JUMP_CHANNEL_MESSAGE,
                  text
                ) as {
                  matches: Array<{
                    channelId: string;
                    guildId: string;
                    messageId: string;
                  }>;
                };
                if (messageLink.matches.length) {
                  const { channelId, messageId } = messageLink.matches[0]!;
                  if (channelId && messageId) {
                    const message =
                      context.messages.get(messageId) ||
                      (await context.rest.fetchMessage(channelId, messageId));
                    const url = Find.findMediaUrlInMessages([message], options);
                    if (url) {
                      return url;
                    }
                  }
                  return null;
                }
              }

              if (context instanceof Command.Context) {
                if (!context.message.embeds.length) {
                  await Timers.sleep(1000);
                }
                const url = Find.findMediaUrlInMessages(
                  [context.message],
                  options
                );
                return url || text;
              } else {
                return text;
              }
            }
          }

          // it's in the form of username#discriminator
          if (value.includes("#") && !value.startsWith("#")) {
            const found = await Find.findMemberByChunkText(context, value);
            if (found) {
              return found.avatarUrlFormat(options.format, { size: 1024 });
            }
            return null;
          }

          // it's in the form of <@123>
          {
            const { matches } = discordRegex(
              DiscordRegexNames.MENTION_USER,
              value
            ) as { matches: Array<{ id: string }> };
            if (matches.length) {
              const { id: userId } = matches[0]!;

              // pass it onto the next statement
              if (isSnowflake(userId)) {
                value = userId;
              }
            }
          }

          // it's just the snowflake of a user
          if (isSnowflake(value)) {
            const userId = value;

            let user: Structures.Member | Structures.User;
            if (
              context instanceof Command.Context &&
              context.message.mentions.has(userId)
            ) {
              user = context.message.mentions.get(userId) as
                | Structures.Member
                | Structures.User;
            } else if (context.guild && context.guild.members.has(userId)) {
              user = context.guild.members.get(userId)!;
            } else if (context.users.has(userId)) {
              user = context.users.get(userId)!;
            } else {
              user = await context.rest.fetchUser(userId);
            }
            return user.avatarUrlFormat(options.format, { size: 1024 });
          }

          // it's <a:emoji:id>
          {
            const { matches } = discordRegex(
              DiscordRegexNames.EMOJI,
              value
            ) as { matches: Array<{ animated: boolean; id: string }> };
            if (matches.length) {
              const { id, animated } = matches[0]!;
              const format = options.format || animated ? "gif" : "png";
              return Endpoints.CDN.URL + Endpoints.CDN.EMOJI(id, format);
            }
          }

          // it's an unicode emoji
          {
            const emojis = onlyEmoji(value);
            if (emojis && emojis.length) {
              for (let emoji of emojis) {
                const codepoint = toCodePointForTwemoji(emoji);
                return VyboseEndpoints.CUSTOM.TWEMOJI_SVG(codepoint);
              }
            }
          }

          // try user search (without the discriminator)
          {
            const found = await Find.findMemberByChunkText(context, value);
            if (found) {
              return found.avatarUrlFormat(options.format, { size: 1024 });
            }
          }
        }
      } catch (error) {
        return null;
      }
      return null;
    };
  }

  // returns undefined if it couldn't find any messages in the past
  // returns null if a value was provided
  export function lastMediaUrl(
    mediaSearchOptions: Find.FindMediaUrlOptions = {}
  ): (
    x: string,
    context: Command.Context | Interaction.InteractionContext
  ) => Promise<string | null | undefined> {
    const customMediaUrl = mediaUrl(mediaSearchOptions);
    const customLastMediaUrl = Parameters.Default.mediaUrl(mediaSearchOptions);

    return async (
      value: string,
      context: Command.Context | Interaction.InteractionContext
    ) => {
      if (context instanceof Interaction.InteractionContext) {
        if (
          context.data.resolved &&
          context.data.resolved.attachments &&
          context.data.resolved.attachments
        ) {
          const attachment = context.data.resolved.attachments.first()!;
          return attachment.url;
        }
      }

      if (value) {
        return customMediaUrl(value, context);
      }
      return (await customLastMediaUrl(context)) || undefined;
    };
  }

  export function imageUrl(format?: Find.Formats | ImageFormats) {
    return async (
      value: string,
      context: Command.Context | Interaction.InteractionContext
    ): Promise<string | null | undefined> => {
      try {
        if (context instanceof Command.Context) {
          // check the message's attachments/stickers first
          {
            const url = Find.findImageUrlInMessages([context.message]);
            if (url) {
              return url;
            }
          }

          // check for reply and if it has an image
          {
            const { messageReference } = context.message;
            if (messageReference && messageReference.messageId) {
              const message =
                messageReference.message ||
                (await context.rest.fetchMessage(
                  messageReference.channelId,
                  messageReference.messageId
                ));
              const url = Find.findImageUrlInMessages([message]);
              if (url) {
                return url;
              }
            }
          }
        }

        if (value) {
          // get last image then
          if (value === "^") {
            return await lastImageUrl(format)("", context);
          }

          // if it's a url
          {
            const { matches } = discordRegex(
              DiscordRegexNames.TEXT_URL,
              value
            ) as { matches: Array<{ text: string }> };
            if (matches.length) {
              const { text } = matches[0]!;

              // if its https://discord.com/channels/:guildId/:channelId/:messageId
              {
                const messageLink = discordRegex(
                  DiscordRegexNames.JUMP_CHANNEL_MESSAGE,
                  text
                ) as {
                  matches: Array<{
                    channelId: string;
                    guildId: string;
                    messageId: string;
                  }>;
                };
                if (messageLink.matches.length) {
                  const { channelId, messageId } = messageLink.matches[0]!;
                  if (channelId && messageId) {
                    const message =
                      context.messages.get(messageId) ||
                      (await context.rest.fetchMessage(channelId, messageId));
                    const url = Find.findImageUrlInMessages([message]);
                    if (url) {
                      return url;
                    }
                  }
                  return null;
                }
              }

              if (context instanceof Command.Context) {
                if (!context.message.embeds.length) {
                  await Timers.sleep(1000);
                }
                const url = Find.findImageUrlInMessages([context.message]);
                return url || text;
              } else {
                return text;
              }
            }
          }

          // it's in the form of username#discriminator
          if (value.includes("#") && !value.startsWith("#")) {
            const found = await Find.findMemberByChunkText(context, value);
            if (found) {
              return found.avatarUrlFormat(format, { size: 1024 });
            }
            return null;
          }

          // it's in the form of <@123>
          {
            const { matches } = discordRegex(
              DiscordRegexNames.MENTION_USER,
              value
            ) as { matches: Array<{ id: string }> };
            if (matches.length) {
              const { id: userId } = matches[0]!;

              // pass it onto the next statement
              if (isSnowflake(userId)) {
                value = userId;
              }
            }
          }

          // it's just the snowflake of a user
          if (isSnowflake(value)) {
            const userId = value;

            let user: Structures.Member | Structures.User;
            if (
              context instanceof Command.Context &&
              context.message.mentions.has(userId)
            ) {
              user = context.message.mentions.get(userId) as
                | Structures.Member
                | Structures.User;
            } else if (context.guild && context.guild.members.has(userId)) {
              user = context.guild.members.get(userId)!;
            } else if (context.users.has(userId)) {
              user = context.users.get(userId)!;
            } else {
              user = await context.rest.fetchUser(userId);
            }
            return user.avatarUrlFormat(format, { size: 1024 });
          }

          // it's <a:emoji:id>
          {
            const { matches } = discordRegex(
              DiscordRegexNames.EMOJI,
              value
            ) as {
              matches: Array<{ animated: boolean; id: string }>;
            };
            if (matches.length) {
              const { id, animated } = matches[0]!;
              const fmt = format || animated ? "gif" : "png";
              return Endpoints.CDN.URL + Endpoints.CDN.EMOJI(id, fmt);
            }
          }

          // it's an unicode emoji
          {
            const emojis = onlyEmoji(value);
            if (emojis && emojis.length) {
              for (let emoji of emojis) {
                const codepoint = toCodePointForTwemoji(emoji);
                return VyboseEndpoints.CUSTOM.TWEMOJI_SVG(codepoint);
              }
            }
          }

          // try user search (without the discriminator)
          {
            const found = await Find.findMemberByChunkText(context, value);
            if (found) {
              return found.avatarUrlFormat(format, { size: 1024 });
            }
          }
        }
      } catch (error) {
        return null;
      }
      return null;
    };
  }

  // returns undefined if it couldn't find any messages in the past
  // returns null if a value was provided
  export function lastImageUrl(format?: Find.Formats | ImageFormats) {
    return async (
      value: string,
      context: Command.Context | Interaction.InteractionContext
    ): Promise<null | string | undefined> => {
      if (context instanceof Interaction.InteractionContext) {
        if (
          context.data.resolved &&
          context.data.resolved.attachments &&
          context.data.resolved.attachments
        ) {
          const attachment = context.data.resolved.attachments.first()!;
          return attachment.url;
        }
      }

      if (value) {
        return imageUrl(format)(value, context);
      }
      return (await Parameters.Default.imageUrl(format)(context)) || undefined;
    };
  }

  // returns null if the no value provided and there was no last image
  export async function lastImageUrls(format?: Find.Formats | ImageFormats) {
    return async (
      value: string,
      context: Command.Context | Interaction.InteractionContext
    ): Promise<Array<string> | null> => {
      if (context instanceof Interaction.InteractionContext) {
        if (
          context.data.resolved &&
          context.data.resolved.attachments &&
          context.data.resolved.attachments
        ) {
          return context.data.resolved.attachments.map((x) => x.url);
        }
      }

      if (value) {
        const urls = new Set<string>();
        if (context instanceof Command.Context) {
          const url = Find.findImageUrlInMessages([context.message]);
          if (url) {
            urls.add(url);
          }
        }

        {
          const { matches } = discordRegex(
            DiscordRegexNames.TEXT_URL,
            value
          ) as {
            matches: Array<{ text: string }>;
          };
          if (matches.length) {
            // match the url with the embed?
            const { text } = matches[0]!;

            let found = false;
            // if its https://discord.com/channels/:guildId/:channelId/:messageId
            {
              const messageLink = discordRegex(
                DiscordRegexNames.JUMP_CHANNEL_MESSAGE,
                text
              ) as {
                matches: Array<{
                  channelId: string;
                  guildId: string;
                  messageId: string;
                }>;
              };
              if (messageLink.matches.length) {
                const { channelId, messageId } = messageLink.matches[0]!;
                if (channelId && messageId) {
                  const message =
                    context.messages.get(messageId) ||
                    (await context.rest.fetchMessage(channelId, messageId));
                  const url = Find.findImageUrlInMessages([message]);
                  if (url) {
                    urls.add(url);
                  }
                }
                // ignore this url no matter what
                found = true;
              }
            }

            if (!found) {
              if (context instanceof Command.Context) {
                if (!context.message.embeds.length) {
                  await Timers.sleep(1000);
                }
                const url = Find.findImageUrlInMessages([context.message]);
                urls.add(url || text);
              } else {
                urls.add(text);
              }
            }
          }
        }

        if (urls.size) {
          return Array.from(urls);
        }

        const values = Array.from(new Set(value.split(" ")));
        for (let i = 0; i < Math.min(5, values.length); i++) {
          if (3 <= urls.size) {
            break;
          }

          const url = await imageUrl(format)(values[i]!, context);
          if (url) {
            urls.add(url);
          }
        }

        return Array.from(urls).slice(0, 3);
      } else {
        const url = await lastImageUrl(format)("", context);
        if (url) {
          return [url];
        }
        return null;
      }
    };
  }

  export async function imageUrlPositional(
    format: Find.Formats | ImageFormats
  ) {
    return async (
      value: string,
      context: Command.Context | Interaction.InteractionContext
    ): Promise<
      string | null | undefined | [true, null | string | undefined]
    > => {
      try {
        if (context instanceof Command.Context) {
          // check the message's attachments/stickers first
          {
            const url = Find.findImageUrlInMessages([context.message]);
            if (url) {
              if (url === value) {
                return url;
              }
              return [true, url];
            }
          }

          // check for reply and if it has an image
          {
            const { messageReference } = context.message;
            if (messageReference && messageReference.messageId) {
              const message =
                messageReference.message ||
                (await context.rest.fetchMessage(
                  messageReference.channelId,
                  messageReference.messageId
                ));
              const url = Find.findImageUrlInMessages([message]);
              if (url) {
                return [true, url];
              }
            }
          }
        }

        if (value) {
          // get last image then
          if (value === "^") {
            return await lastImageUrl(format)("", context);
          }

          // if it's a url
          {
            const { matches } = discordRegex(
              DiscordRegexNames.TEXT_URL,
              value
            ) as { matches: Array<{ text: string }> };
            if (matches.length) {
              const { text } = matches[0]!;

              // if its https://discord.com/channels/:guildId/:channelId/:messageId
              {
                const messageLink = discordRegex(
                  DiscordRegexNames.JUMP_CHANNEL_MESSAGE,
                  text
                ) as {
                  matches: Array<{
                    channelId: string;
                    guildId: string;
                    messageId: string;
                  }>;
                };
                if (messageLink.matches.length) {
                  const { channelId, messageId } = messageLink.matches[0]!;
                  if (channelId && messageId) {
                    const message =
                      context.messages.get(messageId) ||
                      (await context.rest.fetchMessage(channelId, messageId));
                    const url = Find.findImageUrlInMessages([message]);
                    if (url) {
                      return url;
                    }
                  }
                  return null;
                }
              }

              if (context instanceof Command.Context) {
                if (!context.message.embeds.length) {
                  await Timers.sleep(1000);
                }
                const url = Find.findImageUrlInMessages([context.message]);
                return url || text;
              } else {
                return text;
              }
            }
          }

          // it's in the form of username#discriminator
          if (value.includes("#") && !value.startsWith("#")) {
            const found = await Find.findMemberByChunkText(context, value);
            if (found) {
              return found.avatarUrlFormat(null, { size: 1024 });
            }
            return null;
          }

          // it's in the form of <@123>
          {
            const { matches } = discordRegex(
              DiscordRegexNames.MENTION_USER,
              value
            ) as { matches: Array<{ id: string }> };
            if (matches.length) {
              const { id: userId } = matches[0]!;

              // pass it onto the next statement
              if (isSnowflake(userId)) {
                value = userId;
              }
            }
          }

          // it's just the snowflake of a user
          if (isSnowflake(value)) {
            const userId = value;

            let user: Structures.Member | Structures.User;
            if (
              context instanceof Command.Context &&
              context.message.mentions.has(userId)
            ) {
              user = context.message.mentions.get(userId) as
                | Structures.Member
                | Structures.User;
            } else if (context.guild && context.guild.members.has(userId)) {
              user = context.guild.members.get(userId)!;
            } else if (context.users.has(userId)) {
              user = context.users.get(userId)!;
            } else {
              user = await context.rest.fetchUser(userId);
            }
            return user.avatarUrlFormat(null, { size: 1024 });
          }

          // it's <a:emoji:id>
          {
            const { matches } = discordRegex(
              DiscordRegexNames.EMOJI,
              value
            ) as {
              matches: Array<{ animated: boolean; id: string }>;
            };
            if (matches.length) {
              const { animated, id } = matches[0]!;
              const format = animated ? "gif" : "png";
              return Endpoints.CDN.URL + Endpoints.CDN.EMOJI(id, format);
            }
          }

          // it's an unicode emoji
          {
            const emojis = onlyEmoji(value);
            if (emojis && emojis.length) {
              for (let emoji of emojis) {
                const codepoint = toCodePointForTwemoji(emoji);
                return VyboseEndpoints.CUSTOM.TWEMOJI_SVG(codepoint);
              }
            }
          }

          // return the last image and skip parse
          return [true, await lastImageUrl(format)("", context)];
        }
      } catch (error) {
        return null;
      }
      return null;
    };
  }

  export module Default {
    export function mediaUrl(
      mediaSearchOptions: Find.FindMediaUrlOptions = {}
    ): (
      context: Command.Context | Interaction.InteractionContext
    ) => Promise<string | null | undefined> {
      return async (
        context: Command.Context | Interaction.InteractionContext
      ) => {
        if (context instanceof Interaction.InteractionContext) {
          if (
            context.data.resolved &&
            context.data.resolved.attachments &&
            context.data.resolved.attachments
          ) {
            const attachment = context.data.resolved.attachments.first()!;
            return attachment.url!;
          }
        }

        if (context instanceof Command.Context) {
          {
            const url = Find.findMediaUrlInMessages(
              [context.message],
              mediaSearchOptions
            );
            if (url) {
              return url;
            }
          }

          {
            // check reply
            const { messageReference } = context.message;
            if (messageReference && messageReference.messageId) {
              let message = messageReference.message;
              if (
                !message &&
                (context.inDm ||
                  (context.channel && context.channel.canReadHistory))
              ) {
                try {
                  message = await context.rest.fetchMessage(
                    messageReference.channelId,
                    messageReference.messageId
                  );
                } catch (error) {
                  // /shrug
                }
              }
              if (message) {
                const url = Find.findMediaUrlInMessages(
                  [message],
                  mediaSearchOptions
                );
                if (url) {
                  return url;
                }
              }
            }
          }
        }

        const before =
          context instanceof Command.Context ? context.messageId : undefined;
        {
          const beforeId = before ? BigInt(before) : null;
          // we dont get DM channels anymore so we must manually find messages now
          const messages = context.messages
            .filter((message) => {
              if (message.channelId !== context.channelId) {
                return false;
              }
              if (message.interaction && message.hasFlagEphemeral) {
                return message.interaction.user.id === context.userId;
              }
              if (beforeId) {
                return BigInt(message.id) <= beforeId;
              }
              return true;
            })
            .reverse();
          const url = Find.findMediaUrlInMessages(messages, mediaSearchOptions);
          if (url) {
            return url;
          }
        }

        if (
          context.inDm ||
          (context.channel && context.channel.canReadHistory)
        ) {
          const messages = await context.rest.fetchMessages(
            context.channelId!,
            { before, limit: 50 }
          );
          const url = Find.findMediaUrlInMessages(messages, mediaSearchOptions);
          if (url) {
            return url;
          }
        }
      };
    }

    export function imageUrl(format?: Find.Formats | ImageFormats) {
      return async (
        context: Command.Context | Interaction.InteractionContext
      ): Promise<string | null> => {
        if (context instanceof Interaction.InteractionContext) {
          if (
            context.data.resolved &&
            context.data.resolved.attachments &&
            context.data.resolved.attachments
          ) {
            const attachment = context.data.resolved.attachments.first()!;
            return attachment.url!;
          }
        }

        if (context instanceof Command.Context) {
          {
            const url = Find.findImageUrlInMessages([context.message], format);
            if (url) {
              return url;
            }
          }

          {
            // check reply
            const { messageReference } = context.message;
            if (messageReference && messageReference.messageId) {
              let message = messageReference.message;
              if (
                !message &&
                (context.inDm ||
                  (context.channel && context.channel.canReadHistory))
              ) {
                try {
                  message = await context.rest.fetchMessage(
                    messageReference.channelId,
                    messageReference.messageId
                  );
                } catch (error) {
                  // /shrug
                }
              }
              if (message) {
                const url = Find.findImageUrlInMessages([message], format);
                if (url) {
                  return url;
                }
              }
            }
          }
        }

        const before =
          context instanceof Command.Context ? context.messageId : undefined;
        {
          const beforeId = before ? BigInt(before) : null;
          // we dont get DM channels anymore so we must manually find messages now
          const messages = context.messages
            .filter((message) => {
              if (message.channelId !== context.channelId) {
                return false;
              }
              if (message.interaction && message.hasFlagEphemeral) {
                return message.interaction.user.id === context.userId;
              }
              if (beforeId) {
                return BigInt(message.id) <= beforeId;
              }
              return true;
            })
            .reverse();
          const url = Find.findImageUrlInMessages(messages);
          if (url) {
            return url;
          }
        }

        if (
          context.inDm ||
          (context.channel && context.channel.canReadHistory)
        ) {
          const messages = await context.rest.fetchMessages(
            context.channelId!,
            {
              before,
              limit: 50,
            }
          );
          const url = Find.findImageUrlInMessages(messages);
          if (url) {
            return url;
          }
        }

        return null;
      };
    }

    export function applications(
      context: Command.Context | Interaction.InteractionContext
    ): Array<Structures.Application> {
      return context.applications.toArray();
    }

    export function author(
      context: Command.Context | Interaction.InteractionContext
    ): Structures.User {
      return context.user;
    }

    export function channel(
      context: Command.Context | Interaction.InteractionContext
    ): Structures.Channel | null {
      return context.channel;
    }

    export function defaultRole(
      context: Command.Context | Interaction.InteractionContext
    ): Structures.Role | null {
      return (context.guild && context.guild.defaultRole) || null;
    }

    export function guild(
      context: Command.Context | Interaction.InteractionContext
    ): Structures.Guild | null {
      return context.guild || null;
    }

    export async function members(
      context: Command.Context | Interaction.InteractionContext
    ): Promise<Array<Structures.Member | Structures.User>> {
      const guild = context.guild;
      if (guild) {
        if (guild.isReady) {
          return guild.members.toArray();
        }
        const { members } = await guild.requestMembers({
          limit: 0,
          presences: true,
          query: "",
          timeout: 10000,
        });
        return members.toArray();
      }
      return [context.member || context.user];
    }

    export function noEmbed(
      context: Command.Context | Interaction.InteractionContext
    ): boolean {
      if (context.channel) {
        return !context.channel.canEmbedLinks;
      }
      return !context.inDm;
    }

    export function safe(
      context: Command.Context | Interaction.InteractionContext
    ): boolean {
      const { channel } = context;
      if (channel) {
        if (channel.isDm) {
          return false;
        }
        if (channel.nsfw) {
          return false;
        }

        const { guild } = channel;
        if (guild) {
          switch (guild.explicitContentFilter) {
            case GuildExplicitContentFilterTypes.MEMBERS_WITHOUT_ROLES:
              {
                const { member } = context;
                if (member && member.roles.length === 1) {
                  return true;
                }
              }
              break;
            case GuildExplicitContentFilterTypes.ALL_MEMBERS: {
              return true;
            }
          }
        }
      }
      // default to safe filter being off
      return false;
    }
  }

  export module Autocomplete {
    export function choices<T>(items: Array<T>) {
      return async (
        context: InteractionAutoCompleteContext
      ): Promise<unknown> => {
        let choices = items;
        if (context.value) {
          const value = context.value.toLowerCase();
          choices = choices.filter((choice) => {
            return String(choice).toLowerCase().includes(value);
          });
        }
        return await context.respond({
          choices: choices
            .slice(0, 25)
            .map((choice) => ({ name: String(choice), value: String(choice) })),
        });
      };
    }

    export async function guilds(
      context: InteractionAutoCompleteContext
    ): Promise<unknown> {
      const guilds = selfclient.guilds.clone();
      context.client.guilds.forEach((v, k) => guilds.set(k, v));

      const choices = guilds
        .filter((guild) => {
          return (
            guild.name.toLowerCase().startsWith(context.value) ||
            guild.name.toLowerCase().includes(context.value) ||
            guild.id.includes(context.value)
          );
        })
        .map((guild) => ({
          name: `${guild.name} (${guild.id})`,
          value: guild.id,
        }))
        .slice(0, 25);

      // console.log(choices);

      return await context.respond({
        choices,
      });
    }
  }
}
