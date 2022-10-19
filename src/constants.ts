import {
  ChannelTypes,
  ChannelVideoQualityModes,
  GuildExplicitContentFilterTypes,
  GuildNSFWLevels,
  MfaLevels,
  PresenceStatuses,
  StagePrivacyLevels,
  UserFlags,
  VerificationLevels,
} from 'detritus-client/lib/constants';
import { CustomEmojis, Emojis } from './emojis';
import { EmojiInfo } from './tools/emoji';

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
  [String(Permissions.NONE)]: 'None',
  [String(Permissions.CREATE_INSTANT_INVITE)]: 'Create Instant Invite',
  [String(Permissions.KICK_MEMBERS)]: 'Kick Members',
  [String(Permissions.BAN_MEMBERS)]: 'Ban Members',
  [String(Permissions.ADMINISTRATOR)]: 'Administrator',
  [String(Permissions.MANAGE_CHANNELS)]: 'Manage Channels',
  [String(Permissions.MANAGE_GUILD)]: 'Manage Guild',
  [String(Permissions.ADD_REACTIONS)]: 'Add Reactions',
  [String(Permissions.VIEW_AUDIT_LOG)]: 'View Audit Log',
  [String(Permissions.PRIORITY_SPEAKER)]: 'Priority Speaker',
  [String(Permissions.STREAM)]: 'Stream',
  [String(Permissions.VIEW_CHANNEL)]: 'View Channel',
  [String(Permissions.SEND_MESSAGES)]: 'Send Messages',
  [String(Permissions.SEND_TTS_MESSAGES)]: 'Send Messages (Text-To-Speech)',
  [String(Permissions.MANAGE_MESSAGES)]: 'Manage Messages',
  [String(Permissions.EMBED_LINKS)]: 'Embed Links',
  [String(Permissions.ATTACH_FILES)]: 'Attach Files',
  [String(Permissions.READ_MESSAGE_HISTORY)]: 'Read Message History',
  [String(Permissions.MENTION_EVERYONE)]: 'Mention Everyone',
  [String(Permissions.USE_EXTERNAL_EMOJIS)]: 'Use External Emojis',
  [String(Permissions.VIEW_GUILD_ANALYTICS)]: 'View Guild Analytics',
  [String(Permissions.CONNECT)]: 'Connect',
  [String(Permissions.SPEAK)]: 'Speak',
  [String(Permissions.MUTE_MEMBERS)]: 'Mute Members',
  [String(Permissions.DEAFEN_MEMBERS)]: 'Deafen Members',
  [String(Permissions.MOVE_MEMBERS)]: 'Move Members',
  [String(Permissions.USE_VAD)]: 'Use VAD',
  [String(Permissions.CHANGE_NICKNAME)]: 'Change Nickname',
  [String(Permissions.CHANGE_NICKNAMES)]: 'Manage Nicknames',
  [String(Permissions.MANAGE_ROLES)]: 'Manage Roles',
  [String(Permissions.MANAGE_WEBHOOKS)]: 'Manage Webhooks',
  [String(Permissions.MANAGE_EMOJIS)]: 'Manage Emojis',
  [String(Permissions.USE_APPLICATION_COMMANDS)]: 'Use Application Commands',
  [String(Permissions.REQUEST_TO_SPEAK)]: 'Request To Speak',
  [String(Permissions.MANAGE_EVENTS)]: 'Manage Events',
  [String(Permissions.USE_PUBLIC_THREADS)]: 'Use Public Threads',
  [String(Permissions.USE_PRIVATE_THREADS)]: 'Use Private Threads',
  [String(Permissions.USE_EXTERNAL_STICKERS)]: 'Use External Stickers',
  [String(Permissions.SEND_MESSAGES_IN_THREADS)]: 'Send Messages In Threads',
  [String(Permissions.USE_EMBEDDED_ACTIVITES)]: 'Use Embedded Activities',
  [String(Permissions.MODERATE_MEMBERS)]: 'Moderate Members',
};

export const VALID_URL_REGEX =
  /^(?:(?:(?:https?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
export const UNICODE_EMOJI_REGEX =
  /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;
export const TRUSTED_URLS = [
  'cdn.discordapp.com',
  'images-ext-1.discordapp.net',
  'images-ext-2.discordapp.net',
  'media.discordapp.net',
];

export enum Colours {
  Default = 0x000000,

  Aqua = 0x1abc9c,
  DarkAqua = 0x11806a,

  Green = 0x2ecc71,
  DarkGreen = 0x1f8b4c,

  Blue = 0x3498db,
  DarkBlue = 0x206694,

  Purple = 0x9b59b6,
  DarkPurple = 0x71368a,

  LuminousVividPink = 0xe91e63,
  DarkVividPink = 0xad1457,

  Gold = 0xf1c40f,
  DarkGold = 0xc27c0e,

  Orange = 0xe67e22,
  DarkOrange = 0xa84300,

  Red = 0xe74c3c,
  DarkRed = 0x992d22,

  Grey = 0x95a5a6,
  DarkGrey = 0x6c7a81,

  DarkerGrey = 0x7289da,
  LighterGrey = 0xbdc3c7,

  Navy = 0x34495e,
  DarkNavy = 0x2c3e50,

  Yellow = 0xf1c40f,

  Silver = 0x607d8b,
  DarkSilver = 0x546e7a,

  White = 0xffffff,
  Blurple = 0x5865f2,
  Greyple = 0x99aab5,
  DarkButNotBlack = 0x2c2f33,
  BrandGreen = 0x57f287,
  BrandYellow = 0xfee75c,
  BrandFuchsia = 0xeb459e,
  BrandRed = 0xed4245,
  BrandBlack = 0x23272a,

  Background = 0x36393f,
  Embed = 0x2f3136,
}

export enum Brand {
  VYBOSE = 'vybose',
  IMAGGA = 'imagga',
  PXL = 'pxl-api',
}
export const BrandNames: Record<Brand, string> = {
  [Brand.VYBOSE]: 'Vybose',
  [Brand.IMAGGA]: 'Imagga',
  [Brand.PXL]: 'PXL API',
};
export const BrandColours: Record<Brand, Colours> = {
  [Brand.VYBOSE]: Colours.Purple,
  [Brand.IMAGGA]: Colours.Aqua,
  [Brand.PXL]: Colours.White,
};
export const BrandIcons: Record<Brand, URL> = {
  [Brand.VYBOSE]: new URL('https://rqft.space/i/image/vybost.png'),
  [Brand.IMAGGA]: new URL(
    'https://www.programmableweb.com/sites/default/files/imagga_logo_small_500x288px.png'
  ),
  [Brand.PXL]: new URL('https://pxlapi.dev/images/logo-small-transparent.png'),
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
  [UserFlags.HAS_UNREAD_URGENT_MESSAGES]: Emojis.Warning,
  [UserFlags.HYPESQUAD]: CustomEmojis.BadgeHypesquadEvents,
  [UserFlags.HYPESQUAD_ONLINE_HOUSE_1]: CustomEmojis.BadgeBravery,
  [UserFlags.HYPESQUAD_ONLINE_HOUSE_2]: CustomEmojis.BadgeBrilliance,
  [UserFlags.HYPESQUAD_ONLINE_HOUSE_3]: CustomEmojis.BadgeBalance,

  [UserFlags.MFA_SMS]: CustomEmojis.WarningBox,
  [UserFlags.PARTNER]: CustomEmojis.BadgePartner,
  [UserFlags.PREMIUM_EARLY_SUPPORTER]: CustomEmojis.BadgeEarlySupporter,
  [UserFlags.PREMIUM_PROMO_DISMISSED]: Emojis.TriangularFlagOnPost,
  [UserFlags.STAFF]: CustomEmojis.BadgeStaff,
  [UserFlags.SYSTEM]: Emojis.Gear,
  [UserFlags.TEAM_USER]: Emojis.Gear,
  [UserFlags.VERIFIED_BOT]: CustomEmojis.Allow,
  [UserFlags.VERIFIED_DEVELOPER]: CustomEmojis.BadgeBotDeveloper,
};
export const ChannelTypesText: Record<ChannelTypes, string> = {
  [ChannelTypes.BASE]: 'Channel',
  [ChannelTypes.DM]: 'Direct Message',
  [ChannelTypes.GROUP_DM]: 'Group Direct Message',
  [ChannelTypes.GUILD_CATEGORY]: 'Category',
  [ChannelTypes.GUILD_DIRECTORY]: 'Directory',
  [ChannelTypes.GUILD_FORUM]: 'Forum',
  [ChannelTypes.GUILD_NEWS]: 'News',
  [ChannelTypes.GUILD_NEWS_THREAD]: 'News Thread',
  [ChannelTypes.GUILD_PRIVATE_THREAD]: 'Private Thread',
  [ChannelTypes.GUILD_PUBLIC_THREAD]: 'Public Thread',
  [ChannelTypes.GUILD_STAGE_VOICE]: 'Stage',
  [ChannelTypes.GUILD_STORE]: 'Store',
  [ChannelTypes.GUILD_TEXT]: 'Text',
  [ChannelTypes.GUILD_VOICE]: 'Voice',
};

export const StatusEmojis: Record<PresenceStatuses, CustomEmojis> = {
  [PresenceStatuses.DND]: CustomEmojis.DoNotDisturb,
  [PresenceStatuses.IDLE]: CustomEmojis.Idle,
  [PresenceStatuses.INVISIBLE]: CustomEmojis.Offline,
  [PresenceStatuses.OFFLINE]: CustomEmojis.Offline,
  [PresenceStatuses.ONLINE]: CustomEmojis.Online,
};

export const StatusesText: Record<PresenceStatuses, string> = {
  [PresenceStatuses.DND]: 'Do Not Disturb',
  [PresenceStatuses.IDLE]: 'Idle',
  [PresenceStatuses.INVISIBLE]: 'Invisible',
  [PresenceStatuses.OFFLINE]: 'Offline',
  [PresenceStatuses.ONLINE]: 'Online',
};

export function BooleanText(value: boolean): string {
  return value ? 'Yes' : 'No';
}
export const VideoQualityModesText: Record<ChannelVideoQualityModes, string> = {
  [ChannelVideoQualityModes.AUTO]: 'Auto',
  [ChannelVideoQualityModes.FULL]: '720p',
};
export const StagePrivacyLevelsText: Record<StagePrivacyLevels, string> = {
  [StagePrivacyLevels.PUBLIC]: 'Public',
  [StagePrivacyLevels.GUILD_ONLY]: 'Server Only',
};
export enum GuildVoiceRegion {
  Brazil = 'brazil',
  EuCentral = 'eu-central',
  EuWest = 'eu-west',
  Europe = 'europe',
  HongKong = 'hongkong',
  India = 'india',
  Japan = 'japan',
  Russia = 'russia',
  Singapore = 'singapore',
  SouthAfrica = 'southafrica',
  Sydney = 'sydney',
  SouthKorea = 'south-korea',
  UsCentral = 'us-central',
  UsEast = 'us-east',
  UsSouth = 'us-south',
  UsWest = 'us-west',
  Deprecated = 'deprecated',
}
export const VoiceRegionsText: Record<GuildVoiceRegion, string> = {
  [GuildVoiceRegion.Brazil]: 'Brazil',
  [GuildVoiceRegion.EuCentral]: 'Central Europe',
  [GuildVoiceRegion.EuWest]: 'Western Europe',
  [GuildVoiceRegion.Europe]: 'Europe',
  [GuildVoiceRegion.HongKong]: 'Hong Kong',
  [GuildVoiceRegion.India]: 'India',
  [GuildVoiceRegion.Japan]: 'Japan',
  [GuildVoiceRegion.Russia]: 'Russia',
  [GuildVoiceRegion.Singapore]: 'Singapore',
  [GuildVoiceRegion.SouthAfrica]: 'South Africa',
  [GuildVoiceRegion.Sydney]: 'Sydney',
  [GuildVoiceRegion.SouthKorea]: 'South Korea',
  [GuildVoiceRegion.UsCentral]: 'Central United States',
  [GuildVoiceRegion.UsEast]: 'Eastern United States',
  [GuildVoiceRegion.UsSouth]: 'Southern United States',
  [GuildVoiceRegion.UsWest]: 'Western United States',
  [GuildVoiceRegion.Deprecated]: 'Deprecated',
};
export const GuildVerificationLevelsText: Record<VerificationLevels, string> = {
  [VerificationLevels.NONE]: 'None',
  [VerificationLevels.LOW]: 'Low',
  [VerificationLevels.MEDIUM]: 'Medium',
  [VerificationLevels.HIGH]: 'High',
  [VerificationLevels.VERY_HIGH]: 'Very High',
};
export const GuildExplicitContentFiltersText: Record<
  GuildExplicitContentFilterTypes,
  string
> = {
  [GuildExplicitContentFilterTypes.DISABLED]: 'Disabled',
  [GuildExplicitContentFilterTypes.MEMBERS_WITHOUT_ROLES]:
    'Members Without Roles',
  [GuildExplicitContentFilterTypes.ALL_MEMBERS]: 'All Members',
};

export const GuildMfaLevelsText: Record<MfaLevels, string> = {
  [MfaLevels.NONE]: 'None',
  [MfaLevels.ELEVATED]: 'Elevated',
};

export const GuildPublicStatesText: Record<string, string> = {
  [String(true)]: 'Public',
  [String(false)]: 'Private',
};

export enum GuildFeature {
  InviteSplash = 'INVITE_SPLASH',
  VipRegions = 'VIP_REGIONS',
  VanityUrl = 'VANITY_URL',
  Verified = 'VERIFIED',
  Partnered = 'PARTNERED',
  Public = 'PUBLIC',
  Commerce = 'COMMERCE',
  News = 'NEWS',
  Discoverable = 'DISCOVERABLE',
  Featurable = 'FEATURABLE',
  AnimatedIcon = 'ANIMATED_ICON',
  Banner = 'BANNER',
  PublicDisabled = 'PUBLIC_DISABLED',
  WelcomeScreenEnabled = 'WELCOME_SCREEN_ENABLED',
  MemberVerificationGateEnabled = 'MEMBER_VERIFICATION_GATE_ENABLED',
  EnabledDiscoverableBefore = 'ENABLED_DISCOVERABLE_BEFORE',
  Community = 'COMMUNITY',
  PreviewEnabled = 'PREVIEW_ENABLED',
  MemberListDisabled = 'MEMBER_LIST_DISABLED',
  MoreEmoji = 'MORE_EMOJI',
  RelayEnabled = 'RELAY_ENABLED',
  DiscoverableDisabled = 'DISCOVERABLE_DISABLED',
  MonetizationEnabled = 'MONETIZATION_ENABLED',
  TicketedEventsEnabled = 'TICKETED_EVENTS_ENABLED',
  PrivateThreads = 'PRIVATE_THREADS',
  SevenDayThreadArchive = 'SEVEN_DAY_THREAD_ARCHIVE',
  ThreeDayThreadArchive = 'THREE_DAY_THREAD_ARCHIVE',
  ThreadsEnabled = 'THREADS_ENABLED',
  RoleIcons = 'ROLE_ICONS',
  NewThreadPermissions = 'NEW_THREAD_PERMISSIONS',
  ThreadsEnabledTesting = 'THREADS_ENABLED_TESTING',
  Hub = 'HUB',
  AnimatedBanner = 'ANIMATED_BANNER',
  HasDirectoryEntry = 'HAS_DIRECTORY_ENTRY',
  MemberProfiles = 'MEMBER_PROFILES',
  AutoModeration = 'AUTO_MODERATION',
  TextInVoiceEnabled = 'TEXT_IN_VOICE_ENABLED',
  // Private
  BotDeveloperEarlyAccess = 'BOT_DEVELOPER_EARLY_ACCESS',
  GuildHomeTest = 'GUILD_HOME_TEST',
  HadEarlyActivitiesAccess = 'HAD_EARLY_ACTIVITIES_ACCESS',
  ExposedToActivitiesWtpExperiment = 'EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT',
  InternalEmployeeOnly = 'INTERNAL_EMPLOYEE_ONLY',
}
export const GuildFeaturesText: Record<GuildFeature, string> = {
  [GuildFeature.InviteSplash]: 'Invite Splash',
  [GuildFeature.VipRegions]: 'VIP Voice Regions',
  [GuildFeature.VanityUrl]: 'Vanity URL',
  [GuildFeature.Verified]: 'Verified',
  [GuildFeature.Partnered]: 'Partnered',
  [GuildFeature.Public]: 'Public',
  [GuildFeature.Commerce]: 'Commerce',
  [GuildFeature.News]: 'News',
  [GuildFeature.Discoverable]: 'Discoverable',
  [GuildFeature.Featurable]: 'Featurable',
  [GuildFeature.AnimatedIcon]: 'Animated Icon',
  [GuildFeature.Banner]: 'Banner',
  [GuildFeature.PublicDisabled]: 'Public Disabled',
  [GuildFeature.WelcomeScreenEnabled]: 'Welcome Screen Enabled',
  [GuildFeature.MemberVerificationGateEnabled]:
    'Member Verification Gate Enabled',
  [GuildFeature.EnabledDiscoverableBefore]: 'Enabled Discoverable Before',
  [GuildFeature.Community]: 'Community',
  [GuildFeature.PreviewEnabled]: 'Preview Enabled',
  [GuildFeature.MemberListDisabled]: 'Member List Disabled',
  [GuildFeature.MoreEmoji]: 'More Emoji',
  [GuildFeature.RelayEnabled]: 'Relay Enabled',
  [GuildFeature.DiscoverableDisabled]: 'Discoverable Disabled',
  [GuildFeature.MonetizationEnabled]: 'Monetization Enabled',
  [GuildFeature.TicketedEventsEnabled]: 'Ticketed Events Enabled',
  [GuildFeature.PrivateThreads]: 'Private Threads',
  [GuildFeature.SevenDayThreadArchive]: 'Seven Day Thread Archive',
  [GuildFeature.ThreeDayThreadArchive]: 'Three Day Thread Archive',
  [GuildFeature.ThreadsEnabled]: 'Threads Enabled',
  [GuildFeature.RoleIcons]: 'Role Icons',
  [GuildFeature.NewThreadPermissions]: 'New Thread Permissions',
  [GuildFeature.ThreadsEnabledTesting]: 'Threads Enabled Testing',
  [GuildFeature.Hub]: 'Hub',
  [GuildFeature.AnimatedBanner]: 'Animated Banner',
  [GuildFeature.HasDirectoryEntry]: 'Has Directory Entry',
  [GuildFeature.MemberProfiles]: 'Member Profiles',
  [GuildFeature.AutoModeration]: 'Auto Moderation',
  [GuildFeature.TextInVoiceEnabled]: 'Text In Voice Enabled',

  // private

  [GuildFeature.BotDeveloperEarlyAccess]: 'Bot Developer Early Access',
  [GuildFeature.GuildHomeTest]: 'Guild Home Test',
  [GuildFeature.HadEarlyActivitiesAccess]: 'Had Early Activities Access',
  [GuildFeature.ExposedToActivitiesWtpExperiment]:
    'Exposed to Activities WTP Experiment',
  [GuildFeature.InternalEmployeeOnly]: 'Internal Employee Only',
};

export const GuildFeaturesEmojis: Record<GuildFeature, CustomEmojis> = {
  [GuildFeature.InviteSplash]: CustomEmojis.Person,
  [GuildFeature.VipRegions]: CustomEmojis.Speaker,
  [GuildFeature.VanityUrl]: CustomEmojis.SparklePlus,
  [GuildFeature.Verified]: CustomEmojis.Favorite,
  [GuildFeature.Partnered]: CustomEmojis.GuildPartner,
  [GuildFeature.Public]: CustomEmojis.Discover,
  [GuildFeature.Commerce]: CustomEmojis.StoreTag,
  [GuildFeature.News]: CustomEmojis.Megaphone,
  [GuildFeature.Discoverable]: CustomEmojis.Discover,
  [GuildFeature.Featurable]: CustomEmojis.Discover,
  [GuildFeature.AnimatedIcon]: CustomEmojis.InvertedGIFLabel,
  [GuildFeature.Banner]: CustomEmojis.ImagePlaceholder,
  [GuildFeature.PublicDisabled]: CustomEmojis.Discover,
  [GuildFeature.WelcomeScreenEnabled]: CustomEmojis.ChannelCategory,
  [GuildFeature.MemberVerificationGateEnabled]: CustomEmojis.EarlyAccess,
  [GuildFeature.EnabledDiscoverableBefore]: CustomEmojis.Discover,
  [GuildFeature.Community]: CustomEmojis.Person,
  [GuildFeature.PreviewEnabled]: CustomEmojis.Discover,
  [GuildFeature.MemberListDisabled]: CustomEmojis.Person,
  [GuildFeature.MoreEmoji]: CustomEmojis.EmojiSmile,
  [GuildFeature.RelayEnabled]: CustomEmojis.Launch,
  [GuildFeature.DiscoverableDisabled]: CustomEmojis.Discover,
  [GuildFeature.MonetizationEnabled]: CustomEmojis.Ticket,
  [GuildFeature.TicketedEventsEnabled]: CustomEmojis.Ticket,
  [GuildFeature.PrivateThreads]: CustomEmojis.PrivateThreadIcon,
  [GuildFeature.SevenDayThreadArchive]: CustomEmojis.ThreadIcon,
  [GuildFeature.ThreeDayThreadArchive]: CustomEmojis.ThreadIcon,
  [GuildFeature.ThreadsEnabled]: CustomEmojis.ThreadIcon,
  [GuildFeature.RoleIcons]: CustomEmojis.StarBadge,
  [GuildFeature.NewThreadPermissions]: CustomEmojis.ThreadIcon,
  [GuildFeature.ThreadsEnabledTesting]: CustomEmojis.ThreadIcon,
  [GuildFeature.Hub]: CustomEmojis.Education,
  [GuildFeature.AnimatedBanner]: CustomEmojis.InvertedGIFLabel,
  [GuildFeature.HasDirectoryEntry]: CustomEmojis.ChannelDirectory,
  [GuildFeature.MemberProfiles]: CustomEmojis.Person,
  [GuildFeature.AutoModeration]: CustomEmojis.ChannelRules,
  [GuildFeature.TextInVoiceEnabled]: CustomEmojis.SpeakerLimited,

  // private

  [GuildFeature.BotDeveloperEarlyAccess]: CustomEmojis.RichActivity,
  [GuildFeature.GuildHomeTest]: CustomEmojis.RichActivity,
  [GuildFeature.HadEarlyActivitiesAccess]: CustomEmojis.RichActivity,
  [GuildFeature.ExposedToActivitiesWtpExperiment]: CustomEmojis.RichActivity,
  [GuildFeature.InternalEmployeeOnly]: CustomEmojis.RichActivity,
};

export const GuildNsfwLevelsText: Record<GuildNSFWLevels, string> = {
  [GuildNSFWLevels.AGE_RESTRICTED]: 'Age Restricted',
  [GuildNSFWLevels.DEFAULT]: 'Default',
  [GuildNSFWLevels.EXPLICIT]: 'Explicit',
  [GuildNSFWLevels.SAFE]: 'Safe',
};

export const tail = '❯';
export const tab = '\u2003\u200b';
export const delve = '├─';
export const derive = '└─';
export const bar = ' │';
export const emojis: Array<EmojiInfo> = [];
