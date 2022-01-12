import { UserFlags } from "detritus-client/lib/constants";
import { IElement } from "../types";
import { CustomEmojis } from "./customEmojis";

const profileBadgeMap = new Map<UserFlags, IElement>([
  [
    UserFlags["BUG_HUNTER_LEVEL_1"],
    {
      icon: CustomEmojis.BADGE_BUG_HUNTER,
      text: "Bug Hunter Level I",
      anchor: "bug-hunters",
    },
  ],
  [
    UserFlags["BUG_HUNTER_LEVEL_2"],
    {
      icon: CustomEmojis.BADGE_BUG_HUNTER_2,
      text: "Bug Hunter Level II",
      anchor: "bug-hunters",
    },
  ],
  [
    UserFlags["STAFF"],
    {
      icon: CustomEmojis.BADGE_STAFF,
      text: "Discord Employee",
      anchor: "discord-employee-and-system",
    },
  ],
  [
    UserFlags["PREMIUM_EARLY_SUPPORTER"],
    {
      icon: CustomEmojis.BADGE_EARLY_SUPPORTER,
      text: "Early Supporter",
      anchor: "early-supporter",
    },
  ],
  [
    UserFlags["VERIFIED_DEVELOPER"],
    {
      icon: CustomEmojis.BADGE_BOT_DEVELOPER,
      text: "Early Verified Developer",
      anchor: "early-verified-bot-developer",
    },
  ],
  [
    UserFlags["HYPESQUAD_ONLINE_HOUSE_1"],
    {
      icon: CustomEmojis.BADGE_HYPESQUAD_BRAVERY,
      text: "HypeSquad Balance",
      anchor: "hypesquad",
    },
  ],
  [
    UserFlags["HYPESQUAD_ONLINE_HOUSE_2"],
    {
      icon: CustomEmojis.BADGE_HYPESQUAD_BRILLIANCE,
      text: "HypeSquad Bravery",
      anchor: "hypesquad",
    },
  ],
  [
    UserFlags["HYPESQUAD_ONLINE_HOUSE_3"],
    {
      icon: CustomEmojis.BADGE_HYPESQUAD_BALANCE,
      text: "HypeSquad Brilliance",
      anchor: "hypesquad",
    },
  ],
  [
    UserFlags["HYPESQUAD"],
    {
      icon: CustomEmojis.BADGE_HYPESQUAD_EVENTS,
      text: "HypeSquad Events",
      anchor: "hypesquad",
    },
  ],
  [
    UserFlags["PARTNER"],
    {
      icon: CustomEmojis.BADGE_PARTNER,
      text: "Partnered Server Owner",
      anchor: "partnered-server-owner",
    },
  ],
  [
    UserFlags["SYSTEM"],
    {
      icon: CustomEmojis.BADGE_STAFF,
      text: "System",
      anchor: "discord-employee-and-system",
    },
  ],
  [
    UserFlags["TEAM_USER"],
    {
      icon: CustomEmojis.GUI_INVITE,
      text: "Team User",
      anchor: "team-user",
    },
  ],
  [
    UserFlags["VERIFIED_BOT"],
    {
      icon: CustomEmojis.BADGE_VERIFIED_BOT,
      text: "Verified Bot",
      anchor: "verified-bot",
    },
  ],
]);

export { profileBadgeMap };
