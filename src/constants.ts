import {
  ChannelTypes,
  ChannelVideoQualityModes,
  GuildExplicitContentFilterTypes, MfaLevels,
  Permissions,
  StagePrivacyLevels,
  UserFlags,
  VerificationLevels
} from "detritus-client/lib/constants";
import { CustomEmojis, Emojis } from "./tools/emojis";

export const PermissionsText = Object.freeze({
  [String(Permissions.NONE)]: "None",
  [String(Permissions.ADD_REACTIONS)]: "Add Reactions",
  [String(Permissions.ADMINISTRATOR)]: "Administrator",
  [String(Permissions.ATTACH_FILES)]: "Attach Files",
  [String(Permissions.BAN_MEMBERS)]: "Ban Members",
  [String(Permissions.CHANGE_NICKNAME)]: "Change Nickname",
  [String(Permissions.CHANGE_NICKNAMES)]: "Change Nicknames",
  [String(Permissions.CONNECT)]: "Connect",
  [String(Permissions.CREATE_INSTANT_INVITE)]: "Create Instant Invite",
  [String(Permissions.DEAFEN_MEMBERS)]: "Deafen Members",
  [String(Permissions.EMBED_LINKS)]: "Embed Links",
  [String(Permissions.KICK_MEMBERS)]: "Kick Members",
  [String(Permissions.MANAGE_CHANNELS)]: "Manage Channels",
  [String(Permissions.MANAGE_EMOJIS)]: "Manage Emojis",
  [String(Permissions.MANAGE_GUILD)]: "Manage Guild",
  [String(Permissions.MANAGE_MESSAGES)]: "Manage Messages",
  [String(Permissions.MANAGE_ROLES)]: "Manage Roles",
  [String(Permissions.MANAGE_THREADS)]: "Manage Threads",
  [String(Permissions.MANAGE_WEBHOOKS)]: "Manage Webhooks",
  [String(Permissions.MENTION_EVERYONE)]: "Mention Everyone",
  [String(Permissions.MOVE_MEMBERS)]: "Move Members",
  [String(Permissions.MUTE_MEMBERS)]: "Mute Members",
  [String(Permissions.NONE)]: "None",
  [String(Permissions.PRIORITY_SPEAKER)]: "Priority Speaker",
  [String(Permissions.READ_MESSAGE_HISTORY)]: "Read Message History",
  [String(Permissions.REQUEST_TO_SPEAK)]: "Request To Speak",
  [String(Permissions.SEND_MESSAGES)]: "Send Messages",
  [String(Permissions.SEND_TTS_MESSAGES)]: "Text-To-Speech",
  [String(Permissions.SPEAK)]: "Speak",
  [String(Permissions.STREAM)]: "Go Live",
  [String(Permissions.USE_APPLICATION_COMMANDS)]: "Use Application Commands",
  [String(Permissions.USE_EXTERNAL_EMOJIS)]: "Use External Emojis",
  [String(Permissions.USE_PRIVATE_THREADS)]: "Use Private Threads",
  [String(Permissions.USE_PUBLIC_THREADS)]: "Use Public Threads",
  [String(Permissions.USE_VAD)]: "Voice Auto Detect",
  [String(Permissions.VIEW_AUDIT_LOG)]: "View Audit Logs",
  [String(Permissions.VIEW_CHANNEL)]: "View Channel",
  [String(Permissions.VIEW_GUILD_ANALYTICS)]: "View Guild Analytics",
});

export const VALID_URL_REGEX =
  /^(?:(?:(?:https?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
export const UNICODE_EMOJI_REGEX =
  /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;
export const TRUSTED_URLS = [
  "cdn.discordapp.com",
  "images-ext-1.discordapp.net",
  "images-ext-2.discordapp.net",
  "media.discordapp.net",
];

export enum Colours {
  DEFAULT = 0x000000,

  AQUA = 0x1abc9c,
  DARK_AQUA = 0x11806a,

  GREEN = 0x2ecc71,
  DARK_GREEN = 0x1f8b4c,

  BLUE = 0x3498db,
  DARK_BLUE = 0x206694,

  PURPLE = 0x9b59b6,
  DARK_PURPLE = 0x71368a,

  LUMINOUS_VIVID_PINK = 0xe91e63,
  DARK_VIVID_PINK = 0xad1457,

  GOLD = 0xf1c40f,
  DARK_GOLD = 0xc27c0e,

  ORANGE = 0xe67e22,
  DARK_ORANGE = 0xa84300,

  RED = 0xe74c3c,
  DARK_RED = 0x992d22,

  GREY = 0x95a5a6,
  DARK_GREY = 0x6c7a81,

  DARKER_GREY = 0x7289da,
  LIGHTER_GREY = 0xbdc3c7,

  NAVY = 0x34495e,
  DARK_NAVY = 0x2c3e50,

  YELLOW = 0xf1c40f,

  SILVER = 0x607d8b,
  DARK_SILVER = 0x546e7a,

  WHITE = 0xffffff,
  BLURPLE = 0x5865f2,
  GREYPLE = 0x99aab5,
  DARK_BUT_NOT_BLACK = 0x2c2f33,
  BRAND_GREEN = 0x57f287,
  BRAND_YELLOW = 0xfee75c,
  BRAND_FUCHSIA = 0xeb459e,
  BRAND_RED = 0xed4245,
  BRAND_BLACK = 0x23272a,

  BACKGROUND = 0x36393f,
  EMBED = 0x2f3136,
}

export enum Brand {
  VYBOSE = "vybose",
  IMAGGA = "imagga",
  PXL = "pxl-api",
}
export const BrandNames: Record<Brand, string> = {
  [Brand.VYBOSE]: "Vybose",
  [Brand.IMAGGA]: "Imagga",
  [Brand.PXL]: "PXL API",
};
export const BrandColours: Record<Brand, Colours> = {
  [Brand.VYBOSE]: Colours.PURPLE,
  [Brand.IMAGGA]: Colours.AQUA,
  [Brand.PXL]: Colours.WHITE,
};
export const BrandIcons: Record<Brand, URL> = {
  [Brand.VYBOSE]: new URL("https://rqft.space/i/image/vybost.png"),
  [Brand.IMAGGA]: new URL(
    "https://www.programmableweb.com/sites/default/files/imagga_logo_small_500x288px.png"
  ),
  [Brand.PXL]: new URL("https://pxlapi.dev/images/logo-small-transparent.png"),
};
export const IrrelevantPermissions: Array<bigint> = [
  Permissions.NONE,
  Permissions.CREATE_INSTANT_INVITE,
  Permissions.ADD_REACTIONS,
  Permissions.STREAM,
  Permissions.VIEW_CHANNEL,
  Permissions.SEND_MESSAGES,
  Permissions.SEND_TTS_MESSAGES,
  Permissions.EMBED_LINKS,
  Permissions.ATTACH_FILES,
  Permissions.READ_MESSAGE_HISTORY,
  Permissions.USE_EXTERNAL_EMOJIS,
  Permissions.CONNECT,
  Permissions.SPEAK,
  Permissions.USE_VAD,
  Permissions.CHANGE_NICKNAME,
  Permissions.VIEW_GUILD_ANALYTICS,
  Permissions.VIEW_AUDIT_LOG,
  Permissions.PRIORITY_SPEAKER,
  Permissions.USE_APPLICATION_COMMANDS,
  Permissions.REQUEST_TO_SPEAK,
  Permissions.USE_PUBLIC_THREADS,
  Permissions.USE_PRIVATE_THREADS,
];
export const UserBadges: Record<UserFlags, CustomEmojis | Emojis> = {
  [UserFlags.BUG_HUNTER_LEVEL_1]: CustomEmojis.BADGE_BUG_HUNTER,
  [UserFlags.BUG_HUNTER_LEVEL_2]: CustomEmojis.BADGE_BUG_HUNTER_2,
  [UserFlags.DISCORD_CERTIFIED_MODERATOR]:
    CustomEmojis.BADGE_CERTIFIED_MODERATOR,
  [UserFlags.HAS_UNREAD_URGENT_MESSAGES]: Emojis.WARNING,
  [UserFlags.HYPESQUAD]: CustomEmojis.BADGE_HYPESQUAD_EVENTS,
  [UserFlags.HYPESQUAD_ONLINE_HOUSE_1]: CustomEmojis.BADGE_HYPESQUAD_BRILLIANCE,
  [UserFlags.HYPESQUAD_ONLINE_HOUSE_2]: CustomEmojis.BADGE_HYPESQUAD_BRAVERY,
  [UserFlags.HYPESQUAD_ONLINE_HOUSE_3]: CustomEmojis.BADGE_HYPESQUAD_BALANCE,

  [UserFlags.MFA_SMS]: CustomEmojis.STATUS_MOBILE,
  [UserFlags.PARTNER]: CustomEmojis.BADGE_PARTNER,
  [UserFlags.PREMIUM_EARLY_SUPPORTER]: CustomEmojis.BADGE_EARLY_SUPPORTER,
  [UserFlags.PREMIUM_PROMO_DISMISSED]: Emojis.TRIANGULAR_FLAG_ON_POST,
  [UserFlags.STAFF]: CustomEmojis.BADGE_STAFF,
  [UserFlags.SYSTEM]: Emojis.GEAR,
  [UserFlags.TEAM_USER]: Emojis.GEAR,
  [UserFlags.VERIFIED_BOT]: CustomEmojis.BADGE_VERIFIED_BOT,
  [UserFlags.VERIFIED_DEVELOPER]: CustomEmojis.BADGE_BOT_DEVELOPER,
};
export const ChannelTypesText: Record<ChannelTypes, string> = {
  [ChannelTypes.BASE]: "Channel",
  [ChannelTypes.DM]: "Direct Message",
  [ChannelTypes.GROUP_DM]: "Group Direct Message",
  [ChannelTypes.GUILD_CATEGORY]: "Category",
  [ChannelTypes.GUILD_DIRECTORY]: "Directory",
  [ChannelTypes.GUILD_FORUM]: "Forum",
  [ChannelTypes.GUILD_NEWS]: "News",
  [ChannelTypes.GUILD_NEWS_THREAD]: "News Thread",
  [ChannelTypes.GUILD_PRIVATE_THREAD]: "Private Thread",
  [ChannelTypes.GUILD_PUBLIC_THREAD]: "Public Thread",
  [ChannelTypes.GUILD_STAGE_VOICE]: "Stage",
  [ChannelTypes.GUILD_STORE]: "Store",
  [ChannelTypes.GUILD_TEXT]: "Text",
  [ChannelTypes.GUILD_VOICE]: "Voice",
};
export function BooleanText(value: boolean): string {
  return value ? "Yes" : "No";
}
export const VideoQualityModesText: Record<ChannelVideoQualityModes, string> = {
  [ChannelVideoQualityModes.AUTO]: "Auto",
  [ChannelVideoQualityModes.FULL]: "720p",
};
export const StagePrivacyLevelsText: Record<StagePrivacyLevels, string> = {
  [StagePrivacyLevels.PUBLIC]: "Public",
  [StagePrivacyLevels.GUILD_ONLY]: "Server Only",
};
export enum GuildVoiceRegion {
  BRAZIL = "brazil",
  EU_CENTRAL = "eu-central",
  EU_WEST = "eu-west",
  EUROPE = "europe",
  HONGKONG = "hongkong",
  INDIA = "india",
  JAPAN = "japan",
  RUSSIA = "russia",
  SINGAPORE = "singapore",
  SOUTHAFRICA = "southafrica",
  SYDNEY = "sydney",
  SOUTH_KOREA = "south-korea",
  US_CENTRAL = "us-central",
  US_EAST = "us-east",
  US_SOUTH = "us-south",
  US_WEST = "us-west",
  DEPRECATED = "deprecated",
}
export const VoiceRegionsText: Record<GuildVoiceRegion, string> = {
  [GuildVoiceRegion.BRAZIL]: "Brazil",
  [GuildVoiceRegion.EU_CENTRAL]: "Central Europe",
  [GuildVoiceRegion.EU_WEST]: "Western Europe",
  [GuildVoiceRegion.EUROPE]: "Europe",
  [GuildVoiceRegion.HONGKONG]: "Hong Kong",
  [GuildVoiceRegion.INDIA]: "India",
  [GuildVoiceRegion.JAPAN]: "Japan",
  [GuildVoiceRegion.RUSSIA]: "Russia",
  [GuildVoiceRegion.SINGAPORE]: "Singapore",
  [GuildVoiceRegion.SOUTHAFRICA]: "South Africa",
  [GuildVoiceRegion.SYDNEY]: "Sydney",
  [GuildVoiceRegion.SOUTH_KOREA]: "South Korea",
  [GuildVoiceRegion.US_CENTRAL]: "Central United States",
  [GuildVoiceRegion.US_EAST]: "Eastern United States",
  [GuildVoiceRegion.US_SOUTH]: "Southern United States",
  [GuildVoiceRegion.US_WEST]: "Western United States",
  [GuildVoiceRegion.DEPRECATED]: "Deprecated",
};
export const GuildVerificationLevelsText: Record<VerificationLevels, string> = {
  [VerificationLevels.NONE]: "None",
  [VerificationLevels.LOW]: "Low",
  [VerificationLevels.MEDIUM]: "Medium",
  [VerificationLevels.HIGH]: "High",
  [VerificationLevels.VERY_HIGH]: "Very High",
};
export const GuildExplicitContentFiltersText: Record<
  GuildExplicitContentFilterTypes,
  string
> = {
  [GuildExplicitContentFilterTypes.DISABLED]: "Disabled",
  [GuildExplicitContentFilterTypes.MEMBERS_WITHOUT_ROLES]:
    "Members Without Roles",
  [GuildExplicitContentFilterTypes.ALL_MEMBERS]: "All Members",
};

export const GuildMfaLevelsText: Record<MfaLevels, string> = {
  [MfaLevels.NONE]: "None",
  [MfaLevels.ELEVATED]: "Elevated",
};

export const GuildPublicStatesText: Record<string, string> = {
  [String(true)]: "Public",
  [String(false)]: "Private",
};

export enum GuildFeature { 
  INVITE_SPLASH = "INVITE_SPLASH", 
  VIP_REGIONS = "VIP_REGIONS", 
  VANITY_URL = "VANITY_URL", 
  VERIFIED = "VERIFIED", 
  PARTNERED = "PARTNERED", 
  PUBLIC = "PUBLIC", 
  COMMERCE = "COMMERCE", 
  NEWS = "NEWS", 
  DISCOVERABLE = "DISCOVERABLE", 
  FEATURABLE = "FEATURABLE", 
  ANIMATED_ICON = "ANIMATED_ICON", 
  BANNER = "BANNER", 
  PUBLIC_DISABLED = "PUBLIC_DISABLED", 
  WELCOME_SCREEN_ENABLED = "WELCOME_SCREEN_ENABLED", 
  MEMBER_VERIFICATION_GATE_ENABLED = "MEMBER_VERIFICATION_GATE_ENABLED", 
  ENABLED_DISCOVERABLE_BEFORE = "ENABLED_DISCOVERABLE_BEFORE", 
  COMMUNITY = "COMMUNITY", 
  PREVIEW_ENABLED = "PREVIEW_ENABLED", 
  MEMBER_LIST_DISABLED = "MEMBER_LIST_DISABLED", 
  MORE_EMOJI = "MORE_EMOJI", 
  RELAY_ENABLED = "RELAY_ENABLED", 
  DISCOVERABLE_DISABLED = "DISCOVERABLE_DISABLED", 
  MONETIZATION_ENABLED = "MONETIZATION_ENABLED", 
  TICKETED_EVENTS_ENABLED = "TICKETED_EVENTS_ENABLED", 
  PRIVATE_THREADS = "PRIVATE_THREADS", 
  SEVEN_DAY_THREAD_ARCHIVE = "SEVEN_DAY_THREAD_ARCHIVE", 
  THREE_DAY_THREAD_ARCHIVE = "THREE_DAY_THREAD_ARCHIVE", 
  THREADS_ENABLED = "THREADS_ENABLED", 
  ROLE_ICONS = "ROLE_ICONS", 
  NEW_THREAD_PERMISSIONS = "NEW_THREAD_PERMISSIONS", 
  THREADS_ENABLED_TESTING = "THREADS_ENABLED_TESTING", 
  HUB = "HUB", 
  ANIMATED_BANNER = "ANIMATED_BANNER", 
  HAS_DIRECTORY_ENTRY = "HAS_DIRECTORY_ENTRY", 
  MEMBER_PROFILES = "MEMBER_PROFILES"
}
export const GuildFeaturesText: Record<GuildFeature, string> = {
  [GuildFeature.INVITE_SPLASH]: "Invite Splash",
  [GuildFeature.VIP_REGIONS]: "VIP Voice Regions",
  [GuildFeature.VANITY_URL]: "Vanity URL",
  [GuildFeature.VERIFIED]: "Verified",
  [GuildFeature.PARTNERED]: "Partnered",
  [GuildFeature.PUBLIC]: "Public",
  [GuildFeature.COMMERCE]: "Commerce",
  [GuildFeature.NEWS]: "News",
  [GuildFeature.DISCOVERABLE]: "Discoverable",
  [GuildFeature.FEATURABLE]: "Featurable",
  [GuildFeature.ANIMATED_ICON]: "Animated Icon",
  [GuildFeature.BANNER]: "Banner",
  [GuildFeature.PUBLIC_DISABLED]: "Public Disabled",
  [GuildFeature.WELCOME_SCREEN_ENABLED]: "Welcome Screen Enabled",
  [GuildFeature.MEMBER_VERIFICATION_GATE_ENABLED]: "Member Verification Gate Enabled",
  [GuildFeature.ENABLED_DISCOVERABLE_BEFORE]: "Enabled Discoverable Before",
  [GuildFeature.COMMUNITY]: "Community",
  [GuildFeature.PREVIEW_ENABLED]: "Preview Enabled",
  [GuildFeature.MEMBER_LIST_DISABLED]: "Member List Disabled",
  [GuildFeature.MORE_EMOJI]: "More Emoji",
  [GuildFeature.RELAY_ENABLED]: "Relay Enabled",
  [GuildFeature.DISCOVERABLE_DISABLED]: "Discoverable Disabled",
  [GuildFeature.MONETIZATION_ENABLED]: "Monetization Enabled",
  [GuildFeature.TICKETED_EVENTS_ENABLED]: "Ticketed Events Enabled",
  [GuildFeature.PRIVATE_THREADS]: "Private Threads",
  [GuildFeature.SEVEN_DAY_THREAD_ARCHIVE]: "Seven Day Thread Archive",
  [GuildFeature.THREE_DAY_THREAD_ARCHIVE]: "Three Day Thread Archive",
  [GuildFeature.THREADS_ENABLED]: "Threads Enabled",
  [GuildFeature.ROLE_ICONS]: "Role Icons",
  [GuildFeature.NEW_THREAD_PERMISSIONS]: "New Thread Permissions",
  [GuildFeature.THREADS_ENABLED_TESTING]: "Threads Enabled Testing",
  [GuildFeature.HUB]: "Hub",
  [GuildFeature.ANIMATED_BANNER]: "Animated Banner",
  [GuildFeature.HAS_DIRECTORY_ENTRY]: "Has Directory Entry",
  [GuildFeature.MEMBER_PROFILES]: "Member Profiles"
}

export const GuildFeaturesEmojis: Record<GuildFeature, CustomEmojis> = {
  [GuildFeature.INVITE_SPLASH]: CustomEmojis.GUI_FRIENDS,
  [GuildFeature.VIP_REGIONS]: CustomEmojis.CHANNEL_VOICE,
  [GuildFeature.VANITY_URL]: CustomEmojis.GUI_FRIENDS,
  [GuildFeature.VERIFIED]: CustomEmojis.BADGE_VERIFIED,
  [GuildFeature.PARTNERED]: CustomEmojis.BADGE_PARTNER,
  [GuildFeature.PUBLIC]: CustomEmojis.GUI_DISCOVERY,
  [GuildFeature.COMMERCE]: CustomEmojis.CHANNEL_STORE,
  [GuildFeature.NEWS]: CustomEmojis.CHANNEL_NEWS,
  [GuildFeature.DISCOVERABLE]: CustomEmojis.GUI_DISCOVERY,
  [GuildFeature.FEATURABLE]: CustomEmojis.GUI_DISCOVERY,
  [GuildFeature.ANIMATED_ICON]: CustomEmojis.GUI_GIF,
  [GuildFeature.BANNER]: CustomEmojis.GUI_ADD_FILE,
  [GuildFeature.PUBLIC_DISABLED]: CustomEmojis.GUI_DISCOVERY,
  [GuildFeature.WELCOME_SCREEN_ENABLED]: CustomEmojis.GUI_JOIN_ARROW,
  [GuildFeature.MEMBER_VERIFICATION_GATE_ENABLED]: CustomEmojis.GUI_JOIN_ARROW,
  [GuildFeature.ENABLED_DISCOVERABLE_BEFORE]: CustomEmojis.GUI_DISCOVERY,
  [GuildFeature.COMMUNITY]: CustomEmojis.GUI_FRIENDS,
  [GuildFeature.PREVIEW_ENABLED]: CustomEmojis.GUI_DISCOVERY,
  [GuildFeature.MEMBER_LIST_DISABLED]: CustomEmojis.GUI_MEMBERS,
  [GuildFeature.MORE_EMOJI]: CustomEmojis.GUI_EMOJI,
  [GuildFeature.RELAY_ENABLED]: CustomEmojis.GUI_ADD_FILE,
  [GuildFeature.DISCOVERABLE_DISABLED]: CustomEmojis.GUI_DISCOVERY,
  [GuildFeature.MONETIZATION_ENABLED]: CustomEmojis.CHANNEL_STORE,
  [GuildFeature.TICKETED_EVENTS_ENABLED]: CustomEmojis.CHANNEL_STORE,
  [GuildFeature.PRIVATE_THREADS]: CustomEmojis.CHANNEL_THREAD_NEW,
  [GuildFeature.SEVEN_DAY_THREAD_ARCHIVE]: CustomEmojis.CHANNEL_THREAD_NEW,
  [GuildFeature.THREE_DAY_THREAD_ARCHIVE]: CustomEmojis.CHANNEL_THREAD_NEW,
  [GuildFeature.THREADS_ENABLED]: CustomEmojis.CHANNEL_THREAD_NEW,
  [GuildFeature.ROLE_ICONS]: CustomEmojis.GUI_ROLE,
  [GuildFeature.NEW_THREAD_PERMISSIONS]: CustomEmojis.GUI_ADD_FILE,
  [GuildFeature.THREADS_ENABLED_TESTING]: CustomEmojis.CHANNEL_THREAD_NEW,
  [GuildFeature.HUB]: CustomEmojis.GUI_HUB,
  [GuildFeature.ANIMATED_BANNER]: CustomEmojis.GUI_GIF,
  [GuildFeature.HAS_DIRECTORY_ENTRY]: CustomEmojis.CHANNEL_CATEGORY,
  [GuildFeature.MEMBER_PROFILES]: CustomEmojis.GUI_MEMBERS
}