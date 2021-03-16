import { UserFlagsString } from "discord.js";
import { IElement } from "../interfaces/IElement";
import { CustomEmojis } from "./customEmojis";

const profileBadgeMap = new Map<UserFlagsString, IElement>();
profileBadgeMap.set("BUGHUNTER_LEVEL_1", {
  icon: CustomEmojis.BADGE_BUG_HUNTER,
  text: "Bug Hunter Level I",
});
profileBadgeMap.set("BUGHUNTER_LEVEL_2", {
  icon: CustomEmojis.BADGE_BUG_HUNTER_2,
  text: "Bug Hunter Level II",
});
profileBadgeMap.set("DISCORD_EMPLOYEE", {
  icon: CustomEmojis.BADGE_STAFF,
  text: "Discord Employee",
});
profileBadgeMap.set("EARLY_SUPPORTER", {
  icon: CustomEmojis.BADGE_EARLY_SUPPORTER,
  text: "Early Supporter",
});
profileBadgeMap.set("EARLY_VERIFIED_BOT_DEVELOPER", {
  icon: CustomEmojis.BADGE_BOT_DEVELOPER,
  text: "Early Verified Developer",
});
profileBadgeMap.set("HOUSE_BALANCE", {
  icon: CustomEmojis.BADGE_HYPESQUAD_BALANCE,
  text: "HypeSquad Balance",
});
profileBadgeMap.set("HOUSE_BRAVERY", {
  icon: CustomEmojis.BADGE_HYPESQUAD_BRAVERY,
  text: "HypeSquad Bravery",
});
profileBadgeMap.set("HOUSE_BRILLIANCE", {
  icon: CustomEmojis.BADGE_HYPESQUAD_BRILLIANCE,
  text: "HypeSquad Brilliance",
});
profileBadgeMap.set("HYPESQUAD_EVENTS", {
  icon: CustomEmojis.BADGE_HYPESQUAD_EVENTS,
  text: "HypeSquad Events",
});
profileBadgeMap.set("PARTNERED_SERVER_OWNER", {
  icon: CustomEmojis.BADGE_PARTNER,
  text: "Partnered Server Owner",
});
profileBadgeMap.set("SYSTEM", {
  icon: CustomEmojis.BADGE_STAFF,
  text: "System",
});
profileBadgeMap.set("TEAM_USER", {
  icon: CustomEmojis.GUI_INVITE,
  text: "Team User",
});
profileBadgeMap.set("VERIFIED_BOT", {
  icon: CustomEmojis.BADGE_VERIFIED_BOT,
  text: "Verified Bot",
});
export { profileBadgeMap };
