import {
  PlatformTypes,
  PremiumGuildTiers,
} from "detritus-client/lib/constants";
import {
  Application,
  ConnectedAccount,
  Guild,
  User,
} from "detritus-client/lib/structures";
import { replacer, simpleGetLongAgo } from "../functions/tools";
import { IElement } from "../types";
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

export const UserFlagArray: UserFlagUnion[] = [
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
export type CustomPermissionString =
  | "MANAGED"
  | "SERVER_OWNER"
  | "BLACKLISTED_USER"
  | "BLACKLISTED_GUILD_OWNER"
  | "GLOBAL_ADMIN"
  | "SYSTEM"
  | "NONE";
export const PermissionString: (
  | PermissionStringUnion
  | CustomPermissionString
)[] = [
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
export const connectionUrls: Record<
  string,
  ({ id, name }: ConnectedAccount) => string
> = {
  FACEBOOK: ({ id }: ConnectedAccount) => `https://www.facebook.com/${id}`,
  REDDIT: ({ name }: ConnectedAccount) => `https://www.reddit.com/u/${name}`,
  SKYPE: ({ id }: ConnectedAccount) => `skype:${id}?userinfo`,
  SPOTIFY: ({ id }: ConnectedAccount) => `https://open.spotify.com/user/${id}`,
  STEAM: ({ id }: ConnectedAccount) =>
    `https://steamcommunity.com/profiles/${id}`,
  TWITCH: ({ name }: ConnectedAccount) => `https://www.twitch.tv/${name}`,
  TWITTER: ({ name }: ConnectedAccount) => `https://twitter.com/${name}`,
  YOUTUBE: ({ id }: ConnectedAccount) =>
    `https://www.youtube.com/channel/${id}`,
};
export const VerificationLevelArray: IElement[] = [
  { icon: CustomEmojis.STATUS_DND, text: "None" },
  { icon: CustomEmojis.GUI_RICH_PRESENCE, text: "Low" },
  { icon: CustomEmojis.GUI_SETTINGS, text: "Medium" },
  { icon: CustomEmojis.GUI_ROLE, text: "High" },
  { icon: CustomEmojis.STATUS_MOBILE, text: "Very High" },
];

export namespace SystemMessage {
  export const APPLICATION_COMMAND_USED = `${CustomEmojis.GUI_SLASH_COMMAND} {USER} used {COMMAND} with {APPLICATION}.`;
  export const CALL_MISSED = `${CustomEmojis.GUI_CALL} You missed a call from {USER}.`;
  export const CALL_MISSED_WITH_DURATION = `${CustomEmojis.GUI_CALL} You missed a call from {USER} that lasted {DURATION}.`;
  export const CALL_STARTED = `${CustomEmojis.GUI_CALL} {USER} started a call.`;
  export const CALL_STARTED_WITH_DURATION = `${CustomEmojis.GUI_CALL} {USER} started a call that lasted {DURATION}.`;
  export const CHANNEL_FOLLOW_ADD = `${CustomEmojis.CHANNEL_NEWS} {USER} has added **{WEBHOOK_NAME}** to this channel.`;
  export const CHANNEL_NAME_CHANGE = `${CustomEmojis.GUI_NAME_EDITED} {USER} changed the channel name: *{NAME}**`;
  export const CHANNEL_ICON_CHANGE = `${CustomEmojis.GUI_NAME_EDITED} {USER} changed the channel icon.`;
  export const GUILD_DISCOVERY_DISQUALIFIED = `${CustomEmojis.GUI_DISCOVERY} This server has been removed from Server Discovery because it no longer passes all the requirements. Check Server Settings for more details.`;
  export const GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = `${CustomEmojis.GUI_DISCOVERY} This server has failed Discovery activity requirements for 3 weeks in a row. If this server fails for 1 more week; it will be removed from Discovery.`;
  export const GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = `${CustomEmojis.GUI_DISCOVERY} This server has failed Discovery activity requirements for 1 week. If this server fails for 4 weeks in a row; it will be automatically removed from Discovery.`;
  export const GUILD_DISCOVERY_REQUALIFIED = `${CustomEmojis.GUI_DISCOVERY} This server is eligible for Server Discovery again and has been automatically relisted!`;
  export const CHANNEL_PINNED_MESSAGE = `${CustomEmojis.GUI_PINS} {USER} pinned a message to this channel.`;
  export const RECIPIENT_ADD = `${CustomEmojis.GUI_JOIN_ARROW} {USER} added {USER_ADDED} to the group.`;
  export const RECIPIENT_REMOVE = `${CustomEmojis.GUI_LEAVE_ARROW} {USER} removed {USER_REMOVED} from the group.`;
  export const RECIPIENT_REMOVE_SELF = `${CustomEmojis.GUI_LEAVE_ARROW} {USER} left the group.`;
  export const GUILD_MEMBER_JOIN_1 = `${CustomEmojis.GUI_JOIN_ARROW} {USER} joined the party.`;
  export const GUILD_MEMBER_JOIN_2 = `${CustomEmojis.GUI_JOIN_ARROW} {USER} is here.`;
  export const GUILD_MEMBER_JOIN_3 = `${CustomEmojis.GUI_JOIN_ARROW} Welcome, {USER}. We hope you brought pizza.`;
  export const GUILD_MEMBER_JOIN_4 = `${CustomEmojis.GUI_JOIN_ARROW} A wild {USER} appeared.`;
  export const GUILD_MEMBER_JOIN_5 = `${CustomEmojis.GUI_JOIN_ARROW} {USER} just landed.`;
  export const GUILD_MEMBER_JOIN_6 = `${CustomEmojis.GUI_JOIN_ARROW} {USER} just slid into the server.`;
  export const GUILD_MEMBER_JOIN_7 = `${CustomEmojis.GUI_JOIN_ARROW} {USER} just showed up!`;
  export const GUILD_MEMBER_JOIN_8 = `${CustomEmojis.GUI_JOIN_ARROW} Welcome {USER}. Say hi!`;
  export const GUILD_MEMBER_JOIN_9 = `${CustomEmojis.GUI_JOIN_ARROW} {USER} hopped into the server.`;
  export const GUILD_MEMBER_JOIN_10 = `${CustomEmojis.GUI_JOIN_ARROW} Everyone welcome {USER}!`;
  export const GUILD_MEMBER_JOIN_11 = `${CustomEmojis.GUI_JOIN_ARROW} Glad you're here, {USER}.`;
  export const GUILD_MEMBER_JOIN_12 = `${CustomEmojis.GUI_JOIN_ARROW} Good to see you, {USER}.`;
  export const GUILD_MEMBER_JOIN_13 = `${CustomEmojis.GUI_JOIN_ARROW} Yay you made it, {USER}!`;
  export const GUILD_MEMBER_SUBSCRIBED = `${CustomEmojis.BADGE_SERVER_BOOSTER} {USER} just boosted the server!`;
  export const GUILD_MEMBER_SUBSCRIBED_ACHIEVED_TIER = `${CustomEmojis.BADGE_SERVER_BOOSTER} {USER} just boosted the server! {GUILD} has achieved **{PREMIUM_TIER}!**`;
}
interface AvailableObjects {
  user: User;
  command: string;
  application: Application;
  call_duration: number;
  webhook_name: string;
  new_channel_name: string;
  user_added: User;
  user_removed: User;
  guild: Guild;
  premium_tier: PremiumGuildTiers;
}
export type PartialAvailableObjects = Partial<Readonly<AvailableObjects>>;
export function makeSystemMessage(
  system_message: string,
  available_objects: PartialAvailableObjects
) {
  if (Object.keys(available_objects).length > 1)
    throw new Error(`availableObjects must have at least one item`);
  return replacer(system_message, [
    [
      "{USER}",
      available_objects.user ? available_objects.user?.mention : undefined,
    ],
    ["{COMMAND}", available_objects.command],
    [
      "{APPLICATION}",
      available_objects.application
        ? available_objects.application.name
        : undefined,
    ],
    [
      "{DURATION}",
      available_objects.call_duration
        ? simpleGetLongAgo(Date.now() - available_objects.call_duration)
        : undefined,
    ],
    ["{WEBHOOK_NAME}", available_objects.webhook_name],
    ["{NAME}", available_objects.new_channel_name],
    ["{USER_ADDED}", available_objects.user_added],
    ["{USER_REMOVED}", available_objects.user_removed],
    [
      "{GUILD}",
      available_objects.guild ? available_objects.guild.name : undefined,
    ],
    ["{PREMIUM_TIER}", available_objects.premium_tier],
  ]);
}
makeSystemMessage(SystemMessage.APPLICATION_COMMAND_USED, {});
export enum ValidAccount {
  BOT = "bot",
  USER = "user",
  TEAM_USER = "team",
}
export type ValidAccountType = "bot" | "user" | "team";
export interface APIProfile {
  user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
  };
  mutual_guilds: { id: string; nick?: string }[];
  connected_accounts: ConnectedAccount[];
  premium_since?: string;
  premium_guild_since?: string;
}
