import { UserFlagsString } from "discord.js";
import { IconElement } from "../handlers/element";

const profileBadgeMap = new Map<UserFlagsString, IconElement>();
profileBadgeMap.set("BUGHUNTER_LEVEL_1", {
  icon: "<:IconBadge_BugHunter:798624232338227261>",
  text: "Bug Hunter Level I",
});
profileBadgeMap.set("BUGHUNTER_LEVEL_2", {
  icon: "<:IconBadge_BugHunterGold:799290353357684797>",
  text: "Bug Hunter Level II",
});
profileBadgeMap.set("DISCORD_EMPLOYEE", {
  icon: "<:IconBadge_Staff:798624241595318272>",
  text: "Discord Employee",
});
profileBadgeMap.set("EARLY_SUPPORTER", {
  icon: "<:IconBadge_EarlySupporter:798624232471920680>",
  text: "Early Supporter",
});
profileBadgeMap.set("EARLY_VERIFIED_DEVELOPER", {
  icon: "<:IconBadge_BotDeveloper:798624232443478037>",
  text: "Early Verified Developer",
});
profileBadgeMap.set("HOUSE_BALANCE", {
  icon: "<:IconBadge_HypeSquadBalance:798624232409661451>",
  text: "HypeSquad Balance",
});
profileBadgeMap.set("HOUSE_BRAVERY", {
  icon: "<:IconBadge_HypeSquadBravery:798624232425652244>",
  text: "HypeSquad Bravery",
});
profileBadgeMap.set("HOUSE_BRILLIANCE", {
  icon: "<:IconBadge_HypeSquadBrilliance:798624232552529920>",
  text: "HypeSquad Brilliance",
});
profileBadgeMap.set("HYPESQUAD_EVENTS", {
  icon: "<:IconBadge_HypeSquadEvents:798624232694087682>",
  text: "HypeSquad Events",
});
profileBadgeMap.set("PARTNERED_SERVER_OWNER", {
  icon: "<:IconBadge_Partner:798624238939406416>",
  text: "Partnered Server Owner",
});
profileBadgeMap.set("SYSTEM", {
  icon: "<:IconBadge_Staff:798624241595318272>",
  text: "System",
});
profileBadgeMap.set("TEAM_USER", {
  icon: "<:IconGui_Invite:798624241347198987>",
  text: "Team User",
});
profileBadgeMap.set("VERIFIED_BOT", {
  icon: "<:IconBadge_VerifiedBot:798624262533283865>",
  text: "Verified Bot",
});
profileBadgeMap.set("VERIFIED_DEVELOPER", {
  icon: "<:IconBadge_BotDeveloper:798624232443478037>",
  text: "Verified Bot",
});
export { profileBadgeMap };
