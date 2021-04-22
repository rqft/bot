import { IElement } from "../interfaces/IElement";
import { CustomEmojis } from "./customEmojis";
import { UserFlagUnion } from "./utils";

const profileBadgeMap = new Map<
  UserFlagUnion | "NITRO_USER" | "SERVER_BOOSTER",
  IElement
>([
  [
    "NITRO_USER",
    {
      icon: CustomEmojis.BADGE_NITRO,
      text: "Nitro",
      anchor: "nitro",
    },
  ],
  [
    "SERVER_BOOSTER",
    {
      icon: CustomEmojis.BADGE_SERVER_BOOSTER,
      text: "Server Booster",
      anchor: "nitro",
    },
  ],
  [
    "BUG_HUNTER_LEVEL_1",
    {
      icon: CustomEmojis.BADGE_BUG_HUNTER,
      text: "Bug Hunter Level I",
      anchor: "bug-hunters",
    },
  ],
  [
    "BUG_HUNTER_LEVEL_2",
    {
      icon: CustomEmojis.BADGE_BUG_HUNTER_2,
      text: "Bug Hunter Level II",
      anchor: "bug-hunters",
    },
  ],
  [
    "STAFF",
    {
      icon: CustomEmojis.BADGE_STAFF,
      text: "Discord Employee",
      anchor: "discord-employee-and-system",
    },
  ],
  [
    "PREMIUM_EARLY_SUPPORTER",
    {
      icon: CustomEmojis.BADGE_EARLY_SUPPORTER,
      text: "Early Supporter",
      anchor: "early-supporter",
    },
  ],
  [
    "VERIFIED_DEVELOPER",
    {
      icon: CustomEmojis.BADGE_BOT_DEVELOPER,
      text: "Early Verified Developer",
      anchor: "early-verified-bot-developer",
    },
  ],
  [
    "HYPESQUAD_ONLINE_HOUSE_1",
    {
      icon: CustomEmojis.BADGE_HYPESQUAD_BRAVERY,
      text: "HypeSquad Balance",
      anchor: "hypesquad",
    },
  ],
  [
    "HYPESQUAD_ONLINE_HOUSE_2",
    {
      icon: CustomEmojis.BADGE_HYPESQUAD_BRILLIANCE,
      text: "HypeSquad Bravery",
      anchor: "hypesquad",
    },
  ],
  [
    "HYPESQUAD_ONLINE_HOUSE_3",
    {
      icon: CustomEmojis.BADGE_HYPESQUAD_BALANCE,
      text: "HypeSquad Brilliance",
      anchor: "hypesquad",
    },
  ],
  [
    "HYPESQUAD",
    {
      icon: CustomEmojis.BADGE_HYPESQUAD_EVENTS,
      text: "HypeSquad Events",
      anchor: "hypesquad",
    },
  ],
  [
    "PARTNER",
    {
      icon: CustomEmojis.BADGE_PARTNER,
      text: "Partnered Server Owner",
      anchor: "partnered-server-owner",
    },
  ],
  [
    "SYSTEM",
    {
      icon: CustomEmojis.BADGE_STAFF,
      text: "System",
      anchor: "discord-employee-and-system",
    },
  ],
  [
    "TEAM_USER",
    {
      icon: CustomEmojis.GUI_INVITE,
      text: "Team User",
      anchor: "team-user",
    },
  ],
  [
    "VERIFIED_BOT",
    {
      icon: CustomEmojis.BADGE_VERIFIED_BOT,
      text: "Verified Bot",
      anchor: "verified-bot",
    },
  ],
]);

export { profileBadgeMap };
