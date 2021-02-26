import { User } from "discord.js";
import { botBadgeMap } from "../maps/botBadge";

export function getBotBadges(user: User, showIcons: boolean = true) {
  const badges = botBadgeMap
    .get(user.id)
    ?.map((e) => `${showIcons ? e.icon : ""} ${e.text}`);
  return badges ?? [];
}
