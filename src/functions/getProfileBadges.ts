import { GuildMember, User } from "discord.js";
import { profileBadgeMap } from "../enums/profileBadge";

export function getProfileBadges(
  userResolvable: User | GuildMember,
  showIcons: boolean = true
): string[] {
  const badges: string[] = [];
  const user =
    userResolvable instanceof GuildMember
      ? userResolvable.user
      : userResolvable;
  user.flags?.toArray().forEach((e) => {
    const get = profileBadgeMap.get(e);
    badges.push(`${showIcons ? get?.icon : ""} ${get?.text}`);
  });
  if (badges.length == 0) return ["No Badges"];
  return badges;
}
