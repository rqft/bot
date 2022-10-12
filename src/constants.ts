import {
  ChannelTypes,
  ChannelVideoQualityModes,
  GuildExplicitContentFilterTypes,
  MfaLevels,
  PresenceStatuses,
  StagePrivacyLevels,
  UserFlags,
  VerificationLevels,
} from "detritus-client/lib/constants";
import { CustomEmojis, Emojis } from "./emojis";
import { EmojiInfo } from "./tools/emoji";

export const Permissions = {
  NONE: 0n << 0n,
  CREATE_INSTANT_INVITE: 1n << 0n,
  KICK_MEMBERS: 1n << 1n,
  BAN_MEMBERS: 1n << 2n,
  ADMINISTRATOR: 1n << 3n,
  MANAGE_CHANNELS: 1n << 4n,
  MANAGE_GUILD: 1n << 5n,
  ADD_REACTIONS: 1n << 6n,
  VIEW_AUDIT_LOG: 1n << 7n,
  PRIORITY_SPEAKER: 1n << 8n,
  STREAM: 1n << 9n,
  VIEW_CHANNEL: 1n << 10n,
  SEND_MESSAGES: 1n << 11n,
  SEND_TTS_MESSAGES: 1n << 12n,
  MANAGE_MESSAGES: 1n << 13n,
  EMBED_LINKS: 1n << 14n,
  ATTACH_FILES: 1n << 15n,
  READ_MESSAGE_HISTORY: 1n << 16n,
  MENTION_EVERYONE: 1n << 17n,
  USE_EXTERNAL_EMOJIS: 1n << 18n,
  VIEW_GUILD_ANALYTICS: 1n << 19n,
  CONNECT: 1n << 20n,
  SPEAK: 1n << 21n,
  MUTE_MEMBERS: 1n << 22n,
  DEAFEN_MEMBERS: 1n << 23n,
  MOVE_MEMBERS: 1n << 24n,
  USE_VAD: 1n << 25n,
  CHANGE_NICKNAME: 1n << 26n,
  CHANGE_NICKNAMES: 1n << 27n,
  MANAGE_ROLES: 1n << 28n,
  MANAGE_WEBHOOKS: 1n << 29n,
  MANAGE_EMOJIS: 1n << 30n,
  USE_APPLICATION_COMMANDS: 1n << 31n,
  REQUEST_TO_SPEAK: 1n << 32n,
  MANAGE_EVENTS: 1n << 33n,
  MANAGE_THREADS: 1n << 34n,
  USE_PUBLIC_THREADS: 1n << 35n,
  USE_PRIVATE_THREADS: 1n << 36n,
  USE_EXTERNAL_STICKERS: 1n << 37n,
  SEND_MESSAGES_IN_THREADS: 1n << 38n,
  USE_EMBEDDED_ACTIVITES: 1n << 39n,
  MODERATE_MEMBERS: 1n << 40n,
};

export const PermissionsText = {
  [String(Permissions.NONE)]: "None",
  [String(Permissions.CREATE_INSTANT_INVITE)]: "Create Instant Invite",
  [String(Permissions.KICK_MEMBERS)]: "Kick Members",
  [String(Permissions.BAN_MEMBERS)]: "Ban Members",
  [String(Permissions.ADMINISTRATOR)]: "Administrator",
  [String(Permissions.MANAGE_CHANNELS)]: "Manage Channels",
  [String(Permissions.MANAGE_GUILD)]: "Manage Guild",
  [String(Permissions.ADD_REACTIONS)]: "Add Reactions",
  [String(Permissions.VIEW_AUDIT_LOG)]: "View Audit Log",
  [String(Permissions.PRIORITY_SPEAKER)]: "Priority Speaker",
  [String(Permissions.STREAM)]: "Stream",
  [String(Permissions.VIEW_CHANNEL)]: "View Channel",
  [String(Permissions.SEND_MESSAGES)]: "Send Messages",
  [String(Permissions.SEND_TTS_MESSAGES)]: "Send Messages (Text-To-Speech)",
  [String(Permissions.MANAGE_MESSAGES)]: "Manage Messages",
  [String(Permissions.EMBED_LINKS)]: "Embed Links",
  [String(Permissions.ATTACH_FILES)]: "Attach Files",
  [String(Permissions.READ_MESSAGE_HISTORY)]: "Read Message History",
  [String(Permissions.MENTION_EVERYONE)]: "Mention Everyone",
  [String(Permissions.USE_EXTERNAL_EMOJIS)]: "Use External Emojis",
  [String(Permissions.VIEW_GUILD_ANALYTICS)]: "View Guild Analytics",
  [String(Permissions.CONNECT)]: "Connect",
  [String(Permissions.SPEAK)]: "Speak",
  [String(Permissions.MUTE_MEMBERS)]: "Mute Members",
  [String(Permissions.DEAFEN_MEMBERS)]: "Deafen Members",
  [String(Permissions.MOVE_MEMBERS)]: "Move Members",
  [String(Permissions.USE_VAD)]: "Use VAD",
  [String(Permissions.CHANGE_NICKNAME)]: "Change Nickname",
  [String(Permissions.CHANGE_NICKNAMES)]: "Manage Nicknames",
  [String(Permissions.MANAGE_ROLES)]: "Manage Roles",
  [String(Permissions.MANAGE_WEBHOOKS)]: "Manage Webhooks",
  [String(Permissions.MANAGE_EMOJIS)]: "Manage Emojis",
  [String(Permissions.USE_APPLICATION_COMMANDS)]: "Use Application Commands",
  [String(Permissions.REQUEST_TO_SPEAK)]: "Request To Speak",
  [String(Permissions.MANAGE_EVENTS)]: "Manage Events",
  [String(Permissions.USE_PUBLIC_THREADS)]: "Use Public Threads",
  [String(Permissions.USE_PRIVATE_THREADS)]: "Use Private Threads",
  [String(Permissions.USE_EXTERNAL_STICKERS)]: "Use External Stickers",
  [String(Permissions.SEND_MESSAGES_IN_THREADS)]: "Send Messages In Threads",
  [String(Permissions.USE_EMBEDDED_ACTIVITES)]: "Use Embedded Activities",
  [String(Permissions.MODERATE_MEMBERS)]: "Moderate Members",
};

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
  Permissions.USE_EMBEDDED_ACTIVITES,
  Permissions.USE_EXTERNAL_STICKERS,
  Permissions.SEND_MESSAGES_IN_THREADS,
];
export const UserBadges: Record<UserFlags, CustomEmojis | Emojis> = {
  [UserFlags.BUG_HUNTER_LEVEL_1]: CustomEmojis.BadgeBugHunter,
  [UserFlags.BUG_HUNTER_LEVEL_2]: CustomEmojis.BadgeBugHunter2,
  [UserFlags.DISCORD_CERTIFIED_MODERATOR]: CustomEmojis.BadgeCertifiedModerator,
  [UserFlags.HAS_UNREAD_URGENT_MESSAGES]: Emojis.WARNING,
  [UserFlags.HYPESQUAD]: CustomEmojis.BadgeHypesquadEvents,
  [UserFlags.HYPESQUAD_ONLINE_HOUSE_1]: CustomEmojis.BadgeBravery,
  [UserFlags.HYPESQUAD_ONLINE_HOUSE_2]: CustomEmojis.BadgeBrilliance,
  [UserFlags.HYPESQUAD_ONLINE_HOUSE_3]: CustomEmojis.BadgeBalance,

  [UserFlags.MFA_SMS]: CustomEmojis.WarningBox,
  [UserFlags.PARTNER]: CustomEmojis.BadgePartner,
  [UserFlags.PREMIUM_EARLY_SUPPORTER]: CustomEmojis.BadgeEarlySupporter,
  [UserFlags.PREMIUM_PROMO_DISMISSED]: Emojis.TRIANGULAR_FLAG_ON_POST,
  [UserFlags.STAFF]: CustomEmojis.BadgeStaff,
  [UserFlags.SYSTEM]: Emojis.GEAR,
  [UserFlags.TEAM_USER]: Emojis.GEAR,
  [UserFlags.VERIFIED_BOT]: CustomEmojis.Allow,
  [UserFlags.VERIFIED_DEVELOPER]: CustomEmojis.BadgeBotDeveloper,
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

export const StatusEmojis: Record<PresenceStatuses, CustomEmojis> = {
  [PresenceStatuses.DND]: CustomEmojis.DoNotDisturb,
  [PresenceStatuses.IDLE]: CustomEmojis.Idle,
  [PresenceStatuses.INVISIBLE]: CustomEmojis.Offline,
  [PresenceStatuses.OFFLINE]: CustomEmojis.Offline,
  [PresenceStatuses.ONLINE]: CustomEmojis.Online,
};

export const StatusesText: Record<PresenceStatuses, string> = {
  [PresenceStatuses.DND]: "Do Not Disturb",
  [PresenceStatuses.IDLE]: "Idle",
  [PresenceStatuses.INVISIBLE]: "Invisible",
  [PresenceStatuses.OFFLINE]: "Offline",
  [PresenceStatuses.ONLINE]: "Online",
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
  MEMBER_PROFILES = "MEMBER_PROFILES",
  AUTO_MODERATION = "AUTO_MODERATION",
  TEXT_IN_VOICE_ENABLED = "TEXT_IN_VOICE_ENABLED",
  // private
  BOT_DEVELOPER_EARLY_ACCESS = "BOT_DEVELOPER_EARLY_ACCESS",
  GUILD_HOME_TEST = "GUILD_HOME_TEST",
  HAD_EARLY_ACTIVITIES_ACCESS = "HAD_EARLY_ACTIVITIES_ACCESS",
  EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT = "EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT",
  INTERNAL_EMPLOYEE_ONLY = "INTERNAL_EMPLOYEE_ONLY",
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
  [GuildFeature.MEMBER_VERIFICATION_GATE_ENABLED]:
    "Member Verification Gate Enabled",
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
  [GuildFeature.MEMBER_PROFILES]: "Member Profiles",
  [GuildFeature.AUTO_MODERATION]: "Auto Moderation",
  [GuildFeature.TEXT_IN_VOICE_ENABLED]: "Text In Voice Enabled",

  // private

  [GuildFeature.BOT_DEVELOPER_EARLY_ACCESS]: "Bot Developer Early Access",
  [GuildFeature.GUILD_HOME_TEST]: "Guild Home Test",
  [GuildFeature.HAD_EARLY_ACTIVITIES_ACCESS]: "Had Early Activities Access",
  [GuildFeature.EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT]:
    "Exposed to Activities WTP Experiment",
  [GuildFeature.INTERNAL_EMPLOYEE_ONLY]: "Internal Employee Only",
};

export const GuildFeaturesEmojis: Record<GuildFeature, CustomEmojis> = {
  [GuildFeature.INVITE_SPLASH]: CustomEmojis.Person,
  [GuildFeature.VIP_REGIONS]: CustomEmojis.Speaker,
  [GuildFeature.VANITY_URL]: CustomEmojis.SparklePlus,
  [GuildFeature.VERIFIED]: CustomEmojis.Favorite,
  [GuildFeature.PARTNERED]: CustomEmojis.GuildPartner,
  [GuildFeature.PUBLIC]: CustomEmojis.Discover,
  [GuildFeature.COMMERCE]: CustomEmojis.StoreTag,
  [GuildFeature.NEWS]: CustomEmojis.Megaphone,
  [GuildFeature.DISCOVERABLE]: CustomEmojis.Discover,
  [GuildFeature.FEATURABLE]: CustomEmojis.Discover,
  [GuildFeature.ANIMATED_ICON]: CustomEmojis.InvertedGIFLabel,
  [GuildFeature.BANNER]: CustomEmojis.ImagePlaceholder,
  [GuildFeature.PUBLIC_DISABLED]: CustomEmojis.Discover,
  [GuildFeature.WELCOME_SCREEN_ENABLED]: CustomEmojis.ChannelCategory,
  [GuildFeature.MEMBER_VERIFICATION_GATE_ENABLED]: CustomEmojis.EarlyAccess,
  [GuildFeature.ENABLED_DISCOVERABLE_BEFORE]: CustomEmojis.Discover,
  [GuildFeature.COMMUNITY]: CustomEmojis.Person,
  [GuildFeature.PREVIEW_ENABLED]: CustomEmojis.Discover,
  [GuildFeature.MEMBER_LIST_DISABLED]: CustomEmojis.Person,
  [GuildFeature.MORE_EMOJI]: CustomEmojis.EmojiSmile,
  [GuildFeature.RELAY_ENABLED]: CustomEmojis.Launch,
  [GuildFeature.DISCOVERABLE_DISABLED]: CustomEmojis.Discover,
  [GuildFeature.MONETIZATION_ENABLED]: CustomEmojis.Ticket,
  [GuildFeature.TICKETED_EVENTS_ENABLED]: CustomEmojis.Ticket,
  [GuildFeature.PRIVATE_THREADS]: CustomEmojis.PrivateThreadIcon,
  [GuildFeature.SEVEN_DAY_THREAD_ARCHIVE]: CustomEmojis.ThreadIcon,
  [GuildFeature.THREE_DAY_THREAD_ARCHIVE]: CustomEmojis.ThreadIcon,
  [GuildFeature.THREADS_ENABLED]: CustomEmojis.ThreadIcon,
  [GuildFeature.ROLE_ICONS]: CustomEmojis.StarBadge,
  [GuildFeature.NEW_THREAD_PERMISSIONS]: CustomEmojis.ThreadIcon,
  [GuildFeature.THREADS_ENABLED_TESTING]: CustomEmojis.ThreadIcon,
  [GuildFeature.HUB]: CustomEmojis.Education,
  [GuildFeature.ANIMATED_BANNER]: CustomEmojis.InvertedGIFLabel,
  [GuildFeature.HAS_DIRECTORY_ENTRY]: CustomEmojis.ChannelDirectory,
  [GuildFeature.MEMBER_PROFILES]: CustomEmojis.Person,
  [GuildFeature.AUTO_MODERATION]: CustomEmojis.ChannelRules,
  [GuildFeature.TEXT_IN_VOICE_ENABLED]: CustomEmojis.SpeakerLimited,

  // private

  [GuildFeature.BOT_DEVELOPER_EARLY_ACCESS]: CustomEmojis.RichActivity,
  [GuildFeature.GUILD_HOME_TEST]: CustomEmojis.RichActivity,
  [GuildFeature.HAD_EARLY_ACTIVITIES_ACCESS]: CustomEmojis.RichActivity,
  [GuildFeature.EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT]:
    CustomEmojis.RichActivity,
  [GuildFeature.INTERNAL_EMPLOYEE_ONLY]: CustomEmojis.RichActivity,
};

export const tail = "❯";
export const tab = "\u2003\u200b";
export const derive = "└─";
export const emojis: Array<EmojiInfo> = [];
