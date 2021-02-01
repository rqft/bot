import { GuildMember, User } from "discord.js";
import { profileBadgeMap } from "../maps/profileBadge";

export function getProfileBadges(
  userResolvable: User | GuildMember,
  showIcons: boolean = true
) {
  const badges = [];
  const user =
    userResolvable instanceof GuildMember
      ? userResolvable.user
      : userResolvable;
  user.flags?.toArray().forEach((e) => {
    const get = profileBadgeMap.get(e);
    badges.push(`${showIcons ? get?.icon : ""} ${get?.text}`);
  });
  if (user.bot) badges.unshift(`${showIcons ? ":gear:" : ""} Bot`);
  if (badges.length == 0) return ["No Badges"];
  return badges;
}
