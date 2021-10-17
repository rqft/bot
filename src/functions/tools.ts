export const REMOVE_REGEX = /_/g;
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
    cc = `${cc.substr(0, 1).toUpperCase()}${cc.substr(1).toLowerCase()}`;
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
      if (runcheck < v) {
        break;
      }
      if (txt.has(k)) {
        txt.set(k, txt.get(k) + 1);
      } else {
        txt.set(k, 1);
      }
      runcheck -= v;
    }
  }
  const txtret = [];
  let runsc = 0;
  let hitLowest = false;
  for (const [key, value] of txt) {
    if (runsc >= limiter || hitLowest === true) {
      break;
    }
    if (lowestUnit === key) hitLowest = true;
    let cc: string = value > 1 ? `${key}` : key;
    txtret.push(`${value}${cc}`);
    runsc += 1;
  }
  return txtret.join("");
}
export const simpleShortGetLongAgo = (ts: number) =>
  shortLongAgo(ts, 2, undefined, undefined);
import { Member, User } from "detritus-client/lib/structures";
import { profileBadgeMap } from "../enums/profileBadge";
import { UserFlagArray, UserFlagUnion } from "../enums/utils";
import { client } from "../globals";
import { IElement } from "../types";
export async function getProfileBadges(
  userResolvable: User | Member
): Promise<IElement[]> {
  const user =
    userResolvable instanceof Member ? userResolvable.user : userResolvable;
  const flags: (UserFlagUnion | "NITRO_USER" | "SERVER_BOOSTER")[] =
    bitfieldToArray<UserFlagUnion | "NITRO_USER" | "SERVER_BOOSTER">(
      user.publicFlags ?? 0,
      UserFlagArray
    );
  if (
    user.avatar?.startsWith("a_") ||
    (user.presence?.status &&
      user.presence.activities.some(
        // test if the user has a custom emoji in their status
        (e) =>
          e.type === 1 &&
          e.emoji !== undefined &&
          (e.emoji.animated || e.emoji.id !== null)
      )) ||
    client.guilds // test if the user boosts any server
      .filter((e) => e.members.cache.has(user.id))
      .some((e) => !!e.members.cache.get(user.id)?.premiumSinceUnix) ||
    flags.includes("PARTNER") // test if the user is a discord partner
  )
    flags.push("NITRO_USER");
  if (
    client.guilds.some(
      (e) =>
        e.members.cache.has(user.id) &&
        !!e.members.cache.get(user.id)?.premiumSinceUnix // loop thru all guilds and see if they boost any
    )
  )
    flags.push("SERVER_BOOSTER");
  return flags.map((e) => profileBadgeMap.get(e)!);
}
