import { PlatformTypes } from "detritus-client/lib/constants";
import { IElement } from "../interfaces/IElement";
import { CustomEmojis } from "./customEmojis";

export type PresenceStatusUnion =
  | "online"
  | "idle"
  | "dnd"
  | "offline"
  | "invisible";
export const enum PresenceStatus {
  PLAYING = 0,
  STREAMING = 1,
  LISTENING = 2,
  WATCHING = 3,
  CUSTOM_STATUS = 4,
}

export const UserFlagArray = [
  "STAFF",
  "PARTNER",
  "HYPESQUAD",
  "BUG_HUNTER_LEVEL_1",
  "MFA_SMS",
  "PREMIUM_PROMO_DISMISSED",
  "HYPESQUAD_ONLINE_HOUSE_1",
  "HYPESQUAD_ONLINE_HOUSE_2",
  "HYPESQUAD_ONLINE_HOUSE_3",
  "PREMIUM_EARLY_SUPPORTER",
  "TEAM_USER",
  "SYSTEM",
  "HAS_UNREAD_URGENT_MESSAGES",
  "BUG_HUNTER_LEVEL_2",
  "VERIFIED_BOT",
  "VERIFIED_DEVELOPER",
];
export type UserFlagUnion =
  | "STAFF"
  | "PARTNER"
  | "HYPESQUAD"
  | "BUG_HUNTER_LEVEL_1"
  | "MFA_SMS"
  | "PREMIUM_PROMO_DISMISSED"
  | "HYPESQUAD_ONLINE_HOUSE_1"
  | "HYPESQUAD_ONLINE_HOUSE_2"
  | "HYPESQUAD_ONLINE_HOUSE_3"
  | "PREMIUM_EARLY_SUPPORTER"
  | "TEAM_USER"
  | "SYSTEM"
  | "HAS_UNREAD_URGENT_MESSAGES"
  | "BUG_HUNTER_LEVEL_2"
  | "VERIFIED_BOT"
  | "VERIFIED_DEVELOPER";

export const PermissionString = [
  "CREATE_INSTANT_INVITE",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "ADD_REACTIONS",
  "VIEW_AUDIT_LOG",
  "PRIORITY_SPEAKER",
  "STREAM",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE",
  "USE_EXTERNAL_EMOJIS",
  "VIEW_GUILD_ANALYTICS",
  "CONNECT",
  "SPEAK",
  "MUTE_MEMBERS",
  "DEAFEN_MEMBERS",
  "MOVE_MEMBERS",
  "USE_VAD",
  "CHANGE_NICKNAME",
  "CHANGE_NICKNAMES",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_EMOJIS",
];
export type PermissionStringUnion =
  | "NONE"
  | "CREATE_INSTANT_INVITE"
  | "KICK_MEMBERS"
  | "BAN_MEMBERS"
  | "ADMINISTRATOR"
  | "MANAGE_CHANNELS"
  | "MANAGE_GUILD"
  | "ADD_REACTIONS"
  | "VIEW_AUDIT_LOG"
  | "PRIORITY_SPEAKER"
  | "STREAM"
  | "VIEW_CHANNEL"
  | "SEND_MESSAGES"
  | "SEND_TTS_MESSAGES"
  | "MANAGE_MESSAGES"
  | "EMBED_LINKS"
  | "ATTACH_FILES"
  | "READ_MESSAGE_HISTORY"
  | "MENTION_EVERYONE"
  | "USE_EXTERNAL_EMOJIS"
  | "VIEW_GUILD_ANALYTICS"
  | "CONNECT"
  | "SPEAK"
  | "MUTE_MEMBERS"
  | "DEAFEN_MEMBERS"
  | "MOVE_MEMBERS"
  | "USE_VAD"
  | "CHANGE_NICKNAME"
  | "CHANGE_NICKNAMES"
  | "MANAGE_ROLES"
  | "MANAGE_WEBHOOKS"
  | "MANAGE_EMOJIS";
export const ConnectionMap = new Map<PlatformTypes, IElement>([
  [
    PlatformTypes.BATTLENET,
    {
      icon: CustomEmojis.CONNECTION_BATTLENET, //
      text: "Battle.net",
      anchor: "https://example.com/",
    },
  ],
  [
    PlatformTypes.CONTACTS, //
    {
      icon: CustomEmojis.GUI_MEMBERS,
      text: "Contacts",
      anchor: "https://example.com/",
    },
  ],
  [
    PlatformTypes.FACEBOOK,
    {
      icon: CustomEmojis.CONNECTION_BATTLENET,
      text: "Facebook",
      anchor: "https://facebook.com/",
    },
  ],
  [
    PlatformTypes.GITHUB,
    {
      icon: CustomEmojis.CONNECTION_GITHUB,
      text: "Github",
      anchor: "https://github.com/",
    },
  ],
  [
    PlatformTypes.INSTAGRAM,
    {
      icon: CustomEmojis.CONNECTION_INSTAGRAM,
      text: "Instagram",
      anchor: "https://instagram.com/",
    },
  ],
  [
    PlatformTypes.LEAGUE_OF_LEGENDS, //
    {
      icon: CustomEmojis.CONNECTION_LEAGUE,
      text: "League of Legends",
      anchor: "https://example.com/",
    },
  ],
  [
    PlatformTypes.REDDIT,
    {
      icon: CustomEmojis.CONNECTION_REDDIT,
      text: "Reddit",
      anchor: "https://reddit.com/u/",
    },
  ],
  [
    PlatformTypes.SAMSUNG, //
    {
      icon: CustomEmojis.GUI_ADD_FILE,
      text: "Samsung",
      anchor: "https://example.com/",
    },
  ],
  [
    PlatformTypes.SKYPE,
    {
      icon: CustomEmojis.CONNECTION_SKYPE,
      text: "Skype",
      anchor: "https://skype.com/",
    },
  ],
  [
    PlatformTypes.SOUNDCLOUD,
    {
      icon: CustomEmojis.CONNECTION_SOUNDCLOUD,
      text: "Soundcloud",
      anchor: "https://soundcloud.com/",
    },
  ],
  [
    PlatformTypes.SPOTIFY,
    {
      icon: CustomEmojis.CONNECTION_SPOTIFY,
      text: "Spotify",
      anchor: "https://open.spotify.com/",
    },
  ],
  [
    PlatformTypes.STEAM,
    {
      icon: CustomEmojis.CONNECTION_STEAM,
      text: "Steam",
      anchor: "https://steamcommunity.com/profiles/",
    },
  ],
  [
    PlatformTypes.TWITCH,
    {
      icon: CustomEmojis.CONNECTION_TWITCH,
      text: "Twitch",
      anchor: "https://twitch.tv/",
    },
  ],
  [
    PlatformTypes.TWITTER,
    {
      icon: CustomEmojis.CONNECTION_TWITTER,
      text: "Twitter",
      anchor: "https://twitter.com/",
    },
  ],
  [
    PlatformTypes.XBOX,
    {
      icon: CustomEmojis.CONNECTION_XBOX,
      text: "Xbox",
      anchor: " http://live.xbox.com/Profile?Gamertag=",
    },
  ],
  [
    PlatformTypes.YOUTUBE,
    {
      icon: CustomEmojis.CONNECTION_YOUTUBE,
      text: "Youtube",
      anchor: "http://youtube.com/c/",
    },
  ],
]);
