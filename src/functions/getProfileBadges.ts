import { GuildMember, User, UserFlags, UserFlagsString } from "discord.js";
import { client } from "..";
import { profileBadgeMap } from "../enums/profileBadge";

export function getProfileBadges(
  userResolvable: User | GuildMember,
  showIcons: boolean = true,
  raw: boolean = false
): string[] {
  const badges: string[] = [];
  const user =
    userResolvable instanceof GuildMember
      ? userResolvable.user
      : userResolvable;
  const flags: (UserFlagsString | "NITRO" | "SERVER_BOOSTER")[] = (
    user.flags ?? new UserFlags(0)
  ).toArray();
  if (
    user.avatar?.startsWith("a_") ||
    (
      user.presence.status &&
      user.presence.activities.filter(
        (e) =>
          e.type === "CUSTOM_STATUS" &&
          e.emoji &&
          (e.emoji.animated || e.emoji.id)
      )
    ).length ||
    client.guilds.cache
      .filter((e) => e.members.cache.has(user.id))
      .some((e) => !!e.members.cache.get(user.id)?.premiumSinceTimestamp)
  )
    flags.push("NITRO");
  if (
    client.guilds.cache
      .filter((e) => e.members.cache.has(user.id))
      .some((e) => !!e.members.cache.get(user.id)?.premiumSinceTimestamp)
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
  if (badges.length == 0) return ["No Badges"];
  return badges;
}
