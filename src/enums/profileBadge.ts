import { UserFlagsString } from "discord.js";
import { IElement } from "../interfaces/IElement";
import { CustomEmojis } from "./customEmojis";

const profileBadgeMap = new Map<
  UserFlagsString | "NITRO" | "SERVER_BOOSTER",
  IElement
>([
  [
    "NITRO",
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
    "BUGHUNTER_LEVEL_1",
    {
      icon: CustomEmojis.BADGE_BUG_HUNTER,
      text: "Bug Hunter Level I",
      anchor: "bug-hunters",
    },
  ],
  [
    "BUGHUNTER_LEVEL_2",
    {
      icon: CustomEmojis.BADGE_BUG_HUNTER_2,
      text: "Bug Hunter Level II",
      anchor: "bug-hunters",
    },
  ],
  [
    "DISCORD_EMPLOYEE",
    {
      icon: CustomEmojis.BADGE_STAFF,
      text: "Discord Employee",
      anchor: "discord-employee-and-system",
    },
  ],
  [
    "EARLY_SUPPORTER",
    {
      icon: CustomEmojis.BADGE_EARLY_SUPPORTER,
      text: "Early Supporter",
      anchor: "early-supporter",
    },
  ],
  [
    "EARLY_VERIFIED_BOT_DEVELOPER",
    {
      icon: CustomEmojis.BADGE_BOT_DEVELOPER,
      text: "Early Verified Developer",
      anchor: "early-verified-bot-developer",
    },
  ],
  [
    "HOUSE_BALANCE",
    {
      icon: CustomEmojis.BADGE_HYPESQUAD_BALANCE,
      text: "HypeSquad Balance",
      anchor: "hypesquad",
    },
  ],
  [
    "HOUSE_BRAVERY",
    {
      icon: CustomEmojis.BADGE_HYPESQUAD_BRAVERY,
      text: "HypeSquad Bravery",
      anchor: "hypesquad",
    },
  ],
  [
    "HOUSE_BRILLIANCE",
    {
      icon: CustomEmojis.BADGE_HYPESQUAD_BRILLIANCE,
      text: "HypeSquad Brilliance",
      anchor: "hypesquad",
    },
  ],
  [
    "HYPESQUAD_EVENTS",
    {
      icon: CustomEmojis.BADGE_HYPESQUAD_EVENTS,
      text: "HypeSquad Events",
      anchor: "hypesquad",
    },
  ],
  [
    "PARTNERED_SERVER_OWNER",
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
