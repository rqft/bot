import { User } from "discord.js";
import { profileBadgeMap } from "../maps/profileBadge";

export function getProfileBadges(user: User, showIcons: boolean = true) {
  const badges = [];
  user.flags?.toArray().forEach((e) => {
    const get = profileBadgeMap.get(e);
    badges.push(`${showIcons ? get?.icon : ""} ${get?.text}`);
  });
  if (user.bot) badges.unshift(`${showIcons ? ":gear:" : ""} Bot`);
  if (badges.length == 0) return ["No Badges"];
  return badges;
}
