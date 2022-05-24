import { Command, Interaction, Structures } from "detritus-client";
import { Endpoints } from "detritus-client-rest";
import { Context } from "detritus-client/lib/command";
import {
  ChannelTypes,
  DiscordRegexNames,
  GuildExplicitContentFilterTypes,
  ImageFormats
} from "detritus-client/lib/constants";
import {
  InteractionAutoCompleteContext,
  InteractionContext
} from "detritus-client/lib/interaction";
import { regex } from "detritus-client/lib/utils";
import { Timers } from "detritus-utils";
import { UNICODE_EMOJI_REGEX } from "../constants";
import { VyboseEndpoints } from "../endpoints";
import { client, selfclient } from "../globals";
import { Err } from "./error";
import { FindImage } from "./find-image";
import { Markdown } from "./markdown";
import {
  isSnowflake,
  onlyEmoji,
  toCodePointForTwemoji,
  validateUrl
} from "./tools";

export module Parameters {
  export function array<T>(use: (value: string) => T) {
    return function (value: string) {
      return value
        .split("|")
        .map((x) => x.trim())
        .map(use);
    };
  }

  export function codeblock(value: string): {
    language?: string;
    text: string;
  } {
    const { matches } = regex(DiscordRegexNames.TEXT_CODEBLOCK, value) as {
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
  }

  export function number(options: NumberOptions = {}) {
    return (valueStrOrNum: number | string): number => {
      const value = parseInt(valueStrOrNum as string);
      if (isNaN(value)) {
        throw new Err("wasn't a number", { status: 400 });
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
      url: Endpoints.Urls.CDN.slice(0,-1) + Endpoints.CDN.EMOJI(
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
  ) {
    if (!value) {
      return Parameters.Default.author(_context);
    }
    const found = [client, selfclient]
      .map((v) => v.users.toArray())
      .flat(1)
      .find((key) => {
        return (
          key.username.toLowerCase().includes(value) ||
          key.toString().toLowerCase() === value ||
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

  export function channel(options: ChannelOptions = {}) {
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
          const { matches } = regex(
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
          for (let channel of channels) {
            if (channel.name.toLowerCase().startsWith(value)) {
              return channel;
            }
          }
          for (let channel of channels) {
            if (channel.name.toLowerCase().includes(value)) {
              return channel;
            }
          }
        }
      }
      return null;
    };
  }

  export function channels(options: ChannelOptions = {}) {
    const findChannel = channel(options);
    return (
      value: string,
      context: Command.Context | Interaction.InteractionContext
    ): Array<Structures.Channel> => {
      if (value) {
        const channels: Array<Structures.Channel> = [];
        for (let arg of stringArguments(value)) {
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
          const { matches } = regex(DiscordRegexNames.MENTION_ROLE, value) as {
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
        for (let [, role] of guild.roles) {
          if (role.name.toLowerCase().startsWith(value)) {
            return role;
          }
        }
        for (let [, role] of guild.roles) {
          if (role.name.toLowerCase().includes(value)) {
            return role;
          }
        }
      }
    }
    return Default.defaultRole(context);
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

  export function stringArguments(value: string) {
    const results: Array<string> = [];
    while (value.length) {
      let result = value.slice(0, 1);
      value = value.slice(1);

      // check to see if this word starts with any of the quote starts
      // if yes, then continue onto the next word
      if (Quotes.START.includes(result)) {
        let index = value.indexOf((QuotesAll as any)[result], 1);
        if (index !== -1) {
          result = value.slice(0, index);
          value = value.slice(index + 1).trim();
          results.push(result);
          continue;
        }
      }
      // check for the next space, if not then we consume the whole thing
      let index = value.indexOf(" ");
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

  export function imageUrl(as?: ImageFormats) {
    return async (value: string, context: Context | InteractionContext) => {
      if (!value) { value = '^' }
      try {
        if (context instanceof Command.Context) {
          // check the message's attachments/stickers first
          {
            const url = FindImage.findImageUrlInMessages([context.message], as);
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
              const url = FindImage.findImageUrlInMessages([message], as);
              if (url) {
                return url;
              }
            }
          }
        }

        if (value) {
          // get last image then
          if (value === "^") {
            return await Default.imageUrl(as)(context);
          }

          // if it's a url
          {
            const { matches } = regex(DiscordRegexNames.TEXT_URL, value) as {
              matches: Array<{ text: string }>;
            };
            if (matches.length) {
              const [match] = matches;
              const { text } = match!;

              // if its https://discord.com/channels/:guildId/:channelId/:messageId
              {
                const messageLink = regex(
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
                    const url = FindImage.findImageUrlInMessages([message], as);
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
                const url = FindImage.findImageUrlInMessages(
                  [context.message],
                  as
                );
                return url || text;
              } else {
                return text;
              }
            }
          }

          // it's in the form of username#discriminator
          if (value.includes("#") && !value.startsWith("#")) {
            const found = await Parameters.user(value, context);
            if (found) {
              return found.avatarUrlFormat(as, { size: 1024 });
            }
            return null;
          }

          // it's in the form of <@123>
          {
            const { matches } = regex(
              DiscordRegexNames.MENTION_USER,
              value
            ) as {
              matches: Array<{ id: string }>;
            };
            if (matches.length) {
              const [match] = matches;
              const { id: userId } = match!;

              // pass it onto the next statement
              if (isSnowflake(userId)) {
                value = userId;
              }
            }
          }

          // it's just the snowflake of a user
          if (isSnowflake(value)) {
            const userId = value;

            let user: Structures.User;
            if (
              context instanceof Command.Context &&
              context.message.mentions.has(userId)
            ) {
              user = context.message.mentions.get(userId) as
                | Structures.Member
                | Structures.User;
            } else {
              user = await context.rest.fetchUser(userId);
            }
            return user.avatarUrlFormat(as, { size: 1024 });
          }

          // it's <a:emoji:id>
          {
            const { matches } = regex(DiscordRegexNames.EMOJI, value) as {
              matches: Array<{ animated: boolean; id: string }>;
            };
            if (matches.length) {
              const [match] = matches;
              const { id } = match!;
              return Endpoints.CDN.URL + Endpoints.CDN.EMOJI(id, as);
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
            const found = await Parameters.user(value, context);
            if (found) {
              return found.avatarUrlFormat(as, { size: 1024 });
            }
          }
        }
      } catch (error) {
        throw new Err(error);
      }
      throw new Err("No images found");
    };
  }

  export module Default {
    export function imageUrl(as?: ImageFormats) {
      return async (context: Context | InteractionContext) => {
        if (!context.channel) {
          return null;
        }
        const messages = await context.channel.fetchMessages({ limit: 100 });
        const image = FindImage.findImageUrlInMessages(messages, as);
        if (image) {
          return image;
        }
        return null;
      };
    }

    export function applications(
      context: Command.Context | Interaction.InteractionContext
    ) {
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
    ): Boolean {
      if (context.channel) {
        return !context.channel.canEmbedLinks;
      }
      return !context.inDm;
    }

    export function safe(
      context: Command.Context | Interaction.InteractionContext
    ): Boolean {
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
      return async (context: InteractionAutoCompleteContext) => {
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
  }
}
