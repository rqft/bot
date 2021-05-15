import { Member, User } from "detritus-client/lib/structures";
import { client } from "..";
import { profileBadgeMap } from "../enums/profileBadge";
import { UserFlagArray, UserFlagUnion } from "../enums/utils";
import { bitfieldToArray } from "./bitfieldToArray";
export async function getProfileBadges(
  userResolvable: User | Member,
  showIcons: boolean = true,
  raw: boolean = false
): Promise<string[]> {
  const badges: string[] = [];
  const user =
    userResolvable instanceof Member ? userResolvable.user : userResolvable;
  const flags: (
    | UserFlagUnion
    | "NITRO_USER"
    | "SERVER_BOOSTER"
  )[] = bitfieldToArray<UserFlagUnion | "NITRO_USER" | "SERVER_BOOSTER">(
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
  if (raw) return flags.map((e) => profileBadgeMap.get(e)!.text);
  flags.forEach((e) => {
    const get = profileBadgeMap.get(e);
    badges.push(
      `[${
        showIcons ? get?.icon : ""
      }](https://arcy.gitbook.io/vybose/infos/profile-badges#${get?.anchor})`
    );
  });
  if (badges.length == 0) return [];
  return badges;
}
