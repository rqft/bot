import { Command, Interaction, Structures } from "detritus-client";
import { Context, EditOrReply } from "detritus-client/lib/command";
import { DiscordAbortCodes, ImageFormats } from "detritus-client/lib/constants";
import { InteractionContext } from "detritus-client/lib/interaction";
import {
  InteractionEditOrRespond,
  Message,
} from "detritus-client/lib/structures";
import { Animation, Frame, Image } from "imagescript/v2";
import { Pariah } from "pariah";
import { Data } from "pariah/dist/data";
import { IO } from "wilson-kv";
import {
  PermissionsText,
  UNICODE_EMOJI_REGEX,
  VALID_URL_REGEX,
} from "../constants";
import { client } from "../globals";
import { Secrets } from "../secrets";
import { Err } from "./error";
import { Markdown } from "./markdown";

export function editOrReply(
  context: Context,
  options: EditOrReply | string
): Promise<Message>;
export function editOrReply(
  context: InteractionContext,
  options: InteractionEditOrRespond | string
): Promise<null>;
export function editOrReply(
  context: Context | InteractionContext,
  options: EditOrReply | InteractionEditOrRespond | string
): Promise<Message | null>;
export function editOrReply(
  context: Context | InteractionContext,
  options: EditOrReply | InteractionEditOrRespond | string = {}
): Promise<Message | null> {
  if (typeof options === "string") {
    options = { content: options };
  }
  if (context instanceof InteractionContext) {
    return context.editOrRespond({
      ...options,
      allowedMentions: { parse: [], ...options.allowedMentions },
    }) as Promise<Message | null>;
  }
  return context.editOrReply({
    reference: true,
    ...options,
    allowedMentions: {
      parse: [],
      repliedUser: false,
      ...options.allowedMentions,
    },
  });
}

export function permissionsErrorList(failed: Array<bigint>): Array<string> {
  const permissions: Array<string> = [];
  for (const permission of failed) {
    const key = String(permission);
    if (key in PermissionsText) {
      permissions.push(PermissionsText[key]!);
    } else {
      permissions.push(key);
    }
  }
  return permissions.map((v) => v.toLowerCase());
}

export function isSnowflake(data: string): boolean {
  return /^\d{16,21}$/.test(data);
}
export function validateUrl(value: string): boolean {
  return VALID_URL_REGEX.test(value);
}

export function toCardinalNumber(number: number): string {
  const ending = number % 10;

  switch (ending) {
    case 1:
      return `${number.toLocaleString()}st`;
    case 2:
      return `${number.toLocaleString()}nd`;
    case 3:
      return `${number.toLocaleString()}rd`;
    default:
      return `${number.toLocaleString()}th`;
  }
}
export async function fetchMemberOrUserById(
  context: Context | InteractionContext,
  userId: string,
  memberOnly = false
): Promise<Structures.Member | Structures.User> {
  if (context.user.id === userId) {
    if (memberOnly) {
      if (context.member) {
        return context.member;
      }
    } else {
      return context.member || context.user;
    }
  }

  if (context instanceof Context) {
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
      throw new Err("User is not in this server");
    }
    if (context.users.has(userId)) {
      return context.users.get(userId) as Structures.User;
    }
    return await context.rest.fetchUser(userId);
  } catch (error) {
    // UNKNOWN_MEMBER == userId exists
    // UNKNOWN_USER == userId doesn't exist

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    switch ((error as any).code) {
      case DiscordAbortCodes.UNKNOWN_MEMBER: {
        if (memberOnly) {
          throw new Err("User is not in this server");
        }
        return await context.rest.fetchUser(userId);
      }
      case DiscordAbortCodes.UNKNOWN_USER: {
        throw new Err("User not found");
      }
      default: {
        throw error;
      }
    }
  }
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
    await guild.requestMembers({
      limit: 0,
      presences: true,
      query: "",
      timeout: 10000,
    });
  }

  const { channel } = context;
  if (channel) {
    const { messages } = channel;
    if (messages) {
      for (const [, message] of messages) {
        {
          const members = [message.member, message.author].filter((v) => v);
          const found = findMemberByUsername(members, username, discriminator);
          if (found) {
            return found;
          }
        }
        {
          const members = message.mentions;
          const found = findMemberByUsername(members, username, discriminator);
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
      if (guild && guild.memberCount < 1000) {
        const members = findMembersByUsername(
          channel.members,
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
): Promise<Structures.User | Structures.Member | null> {
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
      await guild.requestMembers({
        limit: 0,
        presences: true,
        query: "",
        timeout: 10000,
      });
    }
    // find via guild cache
    const found = findMembersByUsername(guild.members, username, discriminator);
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
export interface FindMemberByUsernameCache {
  values(): IterableIterator<Structures.Member | Structures.User | undefined>;
}
export async function findMembersByChunkText(
  context: Command.Context | Interaction.InteractionContext,
  text: string
): Promise<Array<Structures.User | Structures.Member | null>> {
  const [username, discriminator] = splitTextToDiscordHandle(text);
  return await findMembersByChunk(context, username, discriminator);
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
export function splitTextToDiscordHandle(
  text: string
): [string, string | null] {
  const parts = text.split("#");
  const username = (parts.shift() as string).slice(0, 32).toLowerCase();
  let discriminator: null | string = null;
  if (parts.length) {
    discriminator = (parts.shift() as string).padStart(4, "0");
  }
  return [username, discriminator];
}
export function toCodePoint(
  unicodeSurrogates: string,
  separator = "-"
): string {
  const r: Array<string> = [];
  let c = 0;
  let p = 0;
  let i = 0;

  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((0x10000 + ((p - 0xd800) << 10) + (c - 0xdc00)).toString(16));
      p = 0;
    } else if (0xd800 <= c && c <= 0xdbff) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.join(separator);
}
const U200D = String.fromCharCode(0x200d);
const UFE0F_REGEX = /\uFE0F/g;

export function toCodePointForTwemoji(unicodeSurrogates: string): string {
  if (unicodeSurrogates.indexOf(U200D) < 0) {
    unicodeSurrogates = unicodeSurrogates.replace(UFE0F_REGEX, "");
  }
  return toCodePoint(unicodeSurrogates);
}

export function validateUnicodeEmojis(emoji: string): boolean {
  return UNICODE_EMOJI_REGEX.test(emoji);
}
export function onlyEmoji(emoji: string): Array<string> | false {
  return validateUnicodeEmojis(emoji) && emoji.match(UNICODE_EMOJI_REGEX)!;
}
export async function store(
  value: Buffer | Data<Buffer>,
  filename: string
): Promise<Structures.Attachment> {
  if (value instanceof Data) {
    value = value.payload;
  }
  let e = false;
  const storageChannel = await client.rest
    .fetchChannel(Secrets.StorageChannelId)
    .catch(() => {
      e = true;
    });

  if (!storageChannel || e) {
    throw new Err(
      `Could not find storage channel, ask ${client.owners
        .map((v) => v.tag)
        .join(", ")} to restart the bot`
    );
  }

  const storageMessage = await storageChannel.createMessage({
    content: Date.now().toString(),
    files: [{ filename, value }],
  });

  return storageMessage.attachments.first()!;
}
export const ByteUnits = [
  "Bytes",
  "Kilobytes",
  "Megabytes",
  "Gigabytes",
  "Terabytes",
];
export const SIByteUnits = [
  "Bytes",
  "Kebibytes",
  "Mebibytes",
  "Gibibytes",
  "Tebibytes",
];
export function formatBytes(
  bytes: number,
  decimals = 2,
  noBiBytes = true,
  short = false
): string {
  if (bytes === 0) return short ? "0B" : "0 Bytes";

  const delimiter = noBiBytes ? 1000 : 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = (noBiBytes ? ByteUnits : SIByteUnits).map((x) =>
    short ? x.slice(0, 1) + "B" : x
  );

  const i = Math.floor(Math.log(bytes) / Math.log(delimiter));

  return (
    parseFloat((bytes / Math.pow(delimiter, i)).toFixed(dm)) + " " + sizes[i]
  );
}
export function mergeArrays<T>(...arrays: Array<Array<T>>): Array<T> {
  const merged: T[] = [];
  for (const array of arrays) {
    merged.push(...array);
  }
  return merged;
}
export function buildTimestampString(unix: number | Date): string {
  return `${Markdown.Format.timestamp(
    unix,
    Markdown.TimestampStyles.RELATIVE
  )} ${Markdown.Format.bold("[")}${Markdown.Format.timestamp(
    unix,
    Markdown.TimestampStyles.DATE_SHORT
  ).spoiler()}${Markdown.Format.bold("]")}`;
}
export function cutArray<T>(
  data: Array<T>,
  ...indexes: Array<number>
): Array<Array<T>> {
  const slices = Array.from(new Set(indexes)).sort();
  const cutted: Array<Array<T>> = [];

  let lock = 0;
  for (const slice of slices) {
    cutted.push(data.slice(lock, slice));
    lock = slice;
  }

  return cutted;
}
export function groupArray<T>(data: Array<T>, size: number): Array<Array<T>> {
  const grouped: Array<Array<T>> = [];
  for (let i = 0; i < data.length; i += size) {
    grouped.push(data.slice(i, i + size));
  }
  return grouped;
}

export async function convert(
  uri: string,
  format: ImageFormats = ImageFormats.PNG
): Promise<string> {
  const instance = new Pariah(new URL(uri));
  const data = await instance.get.arrayBuffer();
  const buffer = Buffer.from(data.payload);
  const attachment = await store(buffer, "image." + format);
  return attachment.url!;
}

export async function imagescriptOp(
  data: Image | Animation,
  callback: IO<Image>
): Promise<typeof data> {
  if (data instanceof Image) {
    return callback(data);
  }

  for (let i = 0; i < data.frames.length; i++) {
    const output = callback(data.frames[i]!.image);
    data.frames[i] = new Frame(output.width, output.height, output);
  }

  return data;
}

export function toTitleCase(payload: string): string {
  return payload
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function padCodeBlockFromRows(
  strings: Array<Array<string>>,
  options: {
    join?: string;
    padding?: string;
    padFunc?: (targetLength: number, padString?: string) => string;
  } = {}
): Array<string> {
  const padding = options.padding === undefined ? " " : options.padding;
  const padFunc =
    options.padFunc === undefined ? String.prototype.padStart : options.padFunc;
  const join = options.join === undefined ? " " : options.join;

  const columns: Array<Array<string>> = [];
  const columnsAmount = strings.reduce((x, row) => Math.max(x, row.length), 0);

  for (let i = 0; i < columnsAmount; i++) {
    const column: Array<string> = [];

    let max = 0;
    for (const row of strings) {
      if (i in row) {
        max = Math.max(max, row[i]!.length);
      }
    }
    for (const row of strings) {
      if (i in row) {
        column.push(padFunc.call(row[i], max, padding));
      }
    }
    columns.push(column);
  }

  const rows: Array<string> = [];
  for (let i = 0; i < strings.length; i++) {
    const row: Array<string> = [];
    for (const column of columns) {
      if (i in column) {
        row.push(column[i]!);
      }
    }
    rows.push(row.join(join));
  }
  return rows;
}

export function splitToFields(
  text: string,
  amount: number,
  character = "\n"
): Array<string> {
  const parts: Array<string> = [];

  if (character) {
    const split = text.split(character);
    if (split.length === 1) {
      return split;
    }
    while (split.length) {
      let newText = "";
      while (newText.length < amount && split.length) {
        const part = split.shift()!;
        if (part) {
          if (amount < newText.length + part.length + 2) {
            split.unshift(part);
            break;
          }
          newText += part + "\n";
        }
      }
      parts.push(newText);
    }
  } else {
    while (text.length) {
      parts.push(text.slice(0, amount));
      text = text.slice(amount);
    }
  }
  return parts;
}

export function fileNameFromUrl(url: string | URL) {
  try {
    return new URL(url).pathname.split("/").pop();
  } catch {
    return null;
  }
}

export function extensionFromFileName(fileName: string) {
  const split = fileName.split(".");
  if (split.length === 1) {
    return "";
  }
  return split.pop()!;
}

export function fileExtensionFromUrl(url: string | URL) {
  const fileName = fileNameFromUrl(url);
  if (!fileName) {
    return null;
  }
  return extensionFromFileName(fileName);
}
