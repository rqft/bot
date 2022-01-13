import { Command } from "detritus-client";
import { ArgumentType } from "detritus-client/lib/command";
import {
  ActivityTypes,
  PresenceStatuses,
  UserFlags,
} from "detritus-client/lib/constants";
import {
  Attachment,
  Guild,
  Member,
  PresenceActivity,
  User,
} from "detritus-client/lib/structures";
import { CustomEmojis } from "../enums/customEmojis";
import { Emojis } from "../enums/emojis";
import { profileBadgeMap } from "../enums/profileBadge";
import { UserStatusMap } from "../enums/userStatus";
import { guildVoiceRegionMap, VoiceRegionString } from "../enums/utils";
import { Chars, client, commands } from "../globals";
import { Secrets } from "../secrets";
import { IElement } from "../types";
import { Markup } from "./markup";

export const REMOVE_REGEX = /[_-]/g;
export const CAPITALIZE_REGEX = /(^|[ ])./g;
export function capitalizeWords(s: string): string {
  return s
    .replace(REMOVE_REGEX, " ")
    .replace(CAPITALIZE_REGEX, (e) => e.toUpperCase());
}
export function bitfieldToArray<T>(bitfield: number | bigint, array: T[]): T[];
export function bitfieldToArray(bitfield: number | bigint, array: any[]): any[];
export function bitfieldToArray(bitfield: number | bigint, array: any[]) {
  bitfield = BigInt(bitfield);
  return array.filter((_, i) => {
    const current = BigInt(1 << i);
    return ((bitfield as bigint) & current) === current;
  });
}
export function generateUsage(command: Command.Command) {
  let str = [`${commands.prefixes.custom.toArray()[0]!}${command.fullName}`];
  function type(type: ArgumentType) {
    if (type instanceof Function) return capitalizeWords(type.name);
    if (type instanceof Array) return type.map((type) => type.name).join(" | ");
    return type.toLocaleString();
  }
  function buildArgString(arg: Command.Argument) {
    const optional = optionalBrackets(command.arg.required);
    const prefixes = [...arg.prefixes].filter(
      (v) => !command.fullName.includes(v)
    );
    const prefix = prefixes.length ? `${prefixes[0] ?? "-"}` : "";
    return `${optional.left}${prefix}${arg.label}: ${
      arg.consume ? "..." : ""
    }${type(arg.type)}${optional.right}`;
  }
  if (command.arg) {
    str.push(buildArgString(command.arg));
  }
  if (
    command.argParser &&
    command.argParser.args &&
    command.argParser.args.length
  ) {
    command.argParser.args.forEach((arg) => {
      str.push(buildArgString(arg));
    });
  }

  return str.join(" ");
}
export function removeCamelCase(s: string): string {
  return s
    .replace(/^./g, (m) => m.toUpperCase())
    .replace(/[A-Z]/g, " $&")
    .substr(1);
}
export function optionalBrackets(optional: boolean = false) {
  return !optional
    ? {
        left: "[",
        right: "]",
      }
    : {
        left: "<",
        right: ">",
      };
}
export const max = (array: number[]) => Math.max(...array);
export const min = (array: number[]) => Math.min(...array);
export const fillArrayWithBounds = (min: number, max: number) => {
  min = min === (Infinity || NaN) ? 0 : min;
  max = max === (Infinity || NaN) ? 100 : max;
  const res = [];
  for (let i = min; i < max; i++) res.push(i);
  return res;
};
export const isConsecutive = (array: number[]) =>
  fillArrayWithBounds(min(array), max(array)).every((e) => !array.includes(e));
[...Array(100).keys()].map((i) => i + (i + 1)).join(", ");
export function replacer(base: string, replacers: [string, any][]) {
  for (const [key, value] of replacers) base = base.split(key).join(value);
  return base;
}
const timeMap = new Map([
  ["millenium", 1000 * 60 * 60 * 24 * 365 * 10 * 10 * 10],
  ["century", 1000 * 60 * 60 * 24 * 365 * 10 * 10],
  ["decade", 1000 * 60 * 60 * 24 * 365 * 10],
  ["year", 1000 * 60 * 60 * 24 * 365],
  ["month", 1000 * 60 * 60 * 24 * 31],
  ["week", 1000 * 60 * 60 * 24 * 7],
  ["day", 1000 * 60 * 60 * 24],
  ["hour", 1000 * 60 * 60],
  ["minute", 1000 * 60],
  ["second", 1000],
  ["millisecond", 1],
]);
// anything related to getLongAgo is stolen from metal
export function getLongAgo(
  ts: number,
  limiter: number,
  diffSinceNow: boolean = true,
  lowestUnit: string | undefined = undefined
) {
  if (diffSinceNow) ts = new Date(new Date().getTime() - ts).getTime();
  let runcheck = ts + 0;
  const txt = new Map();
  for (const [k, v] of timeMap) {
    if (runcheck < v || txt.entries.length >= limiter) continue;
    const runs = Math.ceil(runcheck / v) + 1;
    for (let i = 0; i <= runs; i += 1) {
      if (runcheck < v) break;
      if (txt.has(k)) txt.set(k, txt.get(k) + 1);
      else txt.set(k, 1);
      runcheck -= v;
    }
  }
  const txtret = [];
  let runsc = 0;
  let hitLowest = false;
  for (const [key, value] of txt) {
    if (runsc >= limiter || hitLowest === true) break;
    if (lowestUnit === key) hitLowest = true;
    let cc: string = value > 1 ? `${key}s` : key;
    cc = `${cc.slice(0, 1).toUpperCase()}${cc.slice(1).toLowerCase()}`; // stfu
    txtret.push(`${value} ${cc}`);
    runsc += 1;
  }
  return txtret.join(", ");
}
export const simpleGetLongAgo = (ts: number) =>
  getLongAgo(ts, 2, undefined, undefined);
export const expandMs = (ms: number) => simpleGetLongAgo(Date.now() - ms);
const shortTimeMap = new Map([
  ["ml", 1000 * 60 * 60 * 24 * 365 * 10 * 10 * 10],
  ["ct", 1000 * 60 * 60 * 24 * 365 * 10 * 10],
  ["dc", 1000 * 60 * 60 * 24 * 365 * 10],
  ["y", 1000 * 60 * 60 * 24 * 365],
  ["mo", 1000 * 60 * 60 * 24 * 31],
  ["w", 1000 * 60 * 60 * 24 * 7],
  ["d", 1000 * 60 * 60 * 24],
  ["h", 1000 * 60 * 60],
  ["m", 1000 * 60],
  ["s", 1000],
  ["ms", 1],
]);
export function shortLongAgo(
  ts: number,
  limiter: number,
  diffSinceNow: boolean = true,
  lowestUnit: string | undefined = undefined
) {
  if (diffSinceNow) ts = new Date(new Date().getTime() - ts).getTime();
  let runcheck = ts + 0;
  const txt = new Map();
  for (const [k, v] of shortTimeMap) {
    if (runcheck < v || txt.entries.length >= limiter) {
      continue;
    }
    const runs = Math.ceil(runcheck / v) + 1;
    for (let i = 0; i <= runs; i += 1) {
      if (runcheck < v) break;
      txt.has(k) ? txt.set(k, txt.get(k) + 1) : txt.set(k, 1);
      runcheck -= v;
    }
  }
  const txtret = [];
  let runsc = 0;
  let hitLowest = false;
  for (const [key, value] of txt) {
    if (runsc >= limiter || hitLowest === true) break;
    if (lowestUnit === key) hitLowest = true;
    let cc: string = value > 1 ? `${key}` : key;
    txtret.push(`${value}${cc}`);
    runsc += 1;
  }
  return txtret.join("");
}
export const simpleShortGetLongAgo = (ts: number) =>
  shortLongAgo(ts, 2, undefined, undefined);
export async function getProfileBadges(
  userResolvable: User | Member
): Promise<IElement[]> {
  const user =
    userResolvable instanceof Member ? userResolvable.user : userResolvable;
  const flags = bitfieldToArray<keyof typeof UserFlags>(
    user.publicFlags ?? 0,
    Object.keys(UserFlags) as (keyof typeof UserFlags)[]
  );

  return flags.map((e) => profileBadgeMap.get(UserFlags[e])!);
}
export function formatTimestamp(unix: number | Date) {
  if (unix instanceof Date) unix = +unix;
  const timeAgo = Markup.timestamp(unix, "R");
  const timestamp = Markup.timestamp(unix, "D");
  return `${timeAgo} **[${timestamp}]**`;
}
const spotifyIcon = "<:spotify:826151198603870239>";

export function getPresence(user: User, maxTextLength: number = 45) {
  const genTime = (item: PresenceActivity) =>
    `\n${Chars.TAB_SPACER_END} for ${simpleGetLongAgo(
      item.createdAt ?? Date.now()
    )} ${formatTimestamp(item.createdAt ?? Date.now())}`;
  const pres = user.presence!;
  var stat = `${
    // @ts-ignore
    UserStatusMap.get(PresenceStatuses[pres.status.toUpperCase()])?.icon
    // @ts-ignore
  } ${UserStatusMap.get(PresenceStatuses[pres.status.toUpperCase()])?.text}`;
  var custom = null;
  const statuses = [];
  for (const [_key, item] of pres.activities) {
    if (item.type === ActivityTypes.CUSTOM_STATUS) {
      const e = item.emoji ?? CustomEmojis.GUI_RICH_PRESENCE;
      const text = item.state
        ? `${item.state.slice(0, maxTextLength)}${
            item.state.length > maxTextLength ? "..." : ""
          }`
        : "";
      custom = `${e} ${text} (${item.name})${genTime(item)}`;
    }
    if (item.type == ActivityTypes.PLAYING) {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n${Chars.TAB_SPACER} ${item.state}` : "";
      const name = item.name;
      statuses.push(
        `${
          item.isOnXbox ? CustomEmojis.CONNECTION_XBOX : Emojis.VIDEO_GAME
        } ${text}**${name}**${state}${genTime(item)}`
      );
    }
    if (item.type == ActivityTypes.LISTENING) {
      const text = item.details ? `${item.details}` : "";
      const author = item.state ? ` by ${item.state}` : "";
      const track = text + author !== "" ? `${text}${author} - ` : "";
      const name = item.name;
      statuses.push(
        `${
          item.isOnSpotify ? spotifyIcon : Emojis.MUSICAL_NOTE
        } ${track}**${name}**${genTime(item)}`
      );
    }
    if (item.type == ActivityTypes.WATCHING) {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n${Chars.TAB_SPACER} ${item.state}` : "";
      const name = item.name;
      statuses.push(`${Emojis.TV} ${text}**${name}**${state}${genTime(item)}`);
    }
    if (item.type == ActivityTypes.STREAMING) {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n${Chars.TAB_SPACER} ${item.state}` : "";
      const name = item.name;
      statuses.push(
        `${Emojis.SATELLITE} ${text}**${name}**${state}${genTime(item)}`
      );
    }
  }
  return `${stat}${custom ? `\n${custom}` : ""}${
    statuses.length !== 0 ? `\n${statuses.sort().join("\n")}` : ""
  }`;
}

export function getGuildVoiceRegion(guild: Guild, showFlag: boolean = true) {
  const reg = guildVoiceRegionMap.get(guild.region as VoiceRegionString);
  if (!reg) return;
  return `${showFlag ? reg.icon : ""} ${reg.text}`;
}
export function editOrReply(
  context: Command.Context,
  options: Command.EditOrReply | string = {}
) {
  if (typeof options === "string") options = { content: options };

  // check if the message is not deleted and we can read history
  if (
    !context.message.deleted &&
    (!context.channel || context.channel.canReadHistory)
  ) {
    options.messageReference = {
      channelId: context.channelId,
      guildId: context.guildId,
      messageId: context.messageId,
    };
  }
  return context.editOrReply({
    ...options,
    allowedMentions: {
      parse: [],
      repliedUser: false,
      ...options.allowedMentions,
    },
  });
}
export function colorPercent(percent: number, start: number, end: number) {
  var a = percent / 100,
    b = (end - start) * a,
    c = b + start;

  // Return a CSS HSL string
  return hslToHex(c, 100, 50);
}
export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return parseInt(`0x${f(0)}${f(8)}${f(4)}`);
}
export async function storeImage(
  value: Buffer,
  filename: string
): Promise<Attachment> {
  const storageChannel = await client.rest.fetchChannel(
    "842855906508275713",
    true
  );
  const storageMessage = await storageChannel.createMessage({
    files: [{ key: "a", filename: `${filename}`, value }],
  });
  return storageMessage.attachments.first()!;
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
    for (const row of strings)
      if (i in row) max = Math.max(max, row[i]!.length);

    for (const row of strings)
      if (i in row) column.push(padFunc.call(row[i], max, padding));
    columns.push(column);
  }

  const rows: Array<string> = [];
  for (let i = 0; i < strings.length; i++) {
    const row: Array<string> = [];
    for (const column of columns) if (i in column) row.push(column[i]!);

    rows.push(row.join(join));
  }
  return rows;
}
export function removeSecrets(str: string) {
  return replacer(
    str,
    [
      ...Object.values(Secrets.Key),
      ...Object.values(Secrets.AbstractKeys),
      Secrets.BOT_TOKEN,
      Secrets.UserToken,
      ...Secrets.AltTokens,
    ].map((v) => [v, "[KEY]"])
  );
}
