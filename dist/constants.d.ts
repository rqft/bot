import { ChannelTypes, ChannelVideoQualityModes, GuildExplicitContentFilterTypes, MfaLevels, StagePrivacyLevels, UserFlags, VerificationLevels } from "detritus-client/lib/constants";
import { CustomEmojis, Emojis } from "./tools/emojis";
export declare const PermissionsText: Readonly<{
    [x: string]: "None" | "Add Reactions" | "Administrator" | "Attach Files" | "Ban Members" | "Change Nickname" | "Change Nicknames" | "Connect" | "Create Instant Invite" | "Deafen Members" | "Embed Links" | "Kick Members" | "Manage Channels" | "Manage Emojis" | "Manage Guild" | "Manage Messages" | "Manage Roles" | "Manage Threads" | "Manage Webhooks" | "Mention Everyone" | "Move Members" | "Mute Members" | "Priority Speaker" | "Read Message History" | "Request To Speak" | "Send Messages" | "Text-To-Speech" | "Speak" | "Go Live" | "Use Application Commands" | "Use External Emojis" | "Use Private Threads" | "Use Public Threads" | "Voice Auto Detect" | "View Audit Logs" | "View Channel" | "View Guild Analytics";
}>;
export declare const VALID_URL_REGEX: RegExp;
export declare const UNICODE_EMOJI_REGEX: RegExp;
export declare const TRUSTED_URLS: string[];
export declare enum Colours {
    DEFAULT = 0,
    AQUA = 1752220,
    DARK_AQUA = 1146986,
    GREEN = 3066993,
    DARK_GREEN = 2067276,
    BLUE = 3447003,
    DARK_BLUE = 2123412,
    PURPLE = 10181046,
    DARK_PURPLE = 7419530,
    LUMINOUS_VIVID_PINK = 15277667,
    DARK_VIVID_PINK = 11342935,
    GOLD = 15844367,
    DARK_GOLD = 12745742,
    ORANGE = 15105570,
    DARK_ORANGE = 11027200,
    RED = 15158332,
    DARK_RED = 10038562,
    GREY = 9807270,
    DARK_GREY = 7109249,
    DARKER_GREY = 7506394,
    LIGHTER_GREY = 12436423,
    NAVY = 3426654,
    DARK_NAVY = 2899536,
    YELLOW = 15844367,
    SILVER = 6323595,
    DARK_SILVER = 5533306,
    WHITE = 16777215,
    BLURPLE = 5793266,
    GREYPLE = 10070709,
    DARK_BUT_NOT_BLACK = 2895667,
    BRAND_GREEN = 5763719,
    BRAND_YELLOW = 16705372,
    BRAND_FUCHSIA = 15418782,
    BRAND_RED = 15548997,
    BRAND_BLACK = 2303786,
    BACKGROUND = 3553599,
    EMBED = 3092790
}
export declare enum Brand {
    VYBOSE = "vybose",
    IMAGGA = "imagga",
    PXL = "pxl-api"
}
export declare const BrandNames: Record<Brand, string>;
export declare const BrandColours: Record<Brand, Colours>;
export declare const BrandIcons: Record<Brand, URL>;
export declare const IrrelevantPermissions: Array<bigint>;
export declare const UserBadges: Record<UserFlags, CustomEmojis | Emojis>;
export declare const ChannelTypesText: Record<ChannelTypes, string>;
export declare function BooleanText(value: boolean): string;
export declare const VideoQualityModesText: Record<ChannelVideoQualityModes, string>;
export declare const StagePrivacyLevelsText: Record<StagePrivacyLevels, string>;
export declare enum GuildVoiceRegion {
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
    DEPRECATED = "deprecated"
}
export declare const VoiceRegionsText: Record<GuildVoiceRegion, string>;
export declare const GuildVerificationLevelsText: Record<VerificationLevels, string>;
export declare const GuildExplicitContentFiltersText: Record<GuildExplicitContentFilterTypes, string>;
export declare const GuildMfaLevelsText: Record<MfaLevels, string>;
export declare const GuildPublicStatesText: Record<string, string>;
export declare enum GuildFeature {
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
    BOT_DEVELOPER_EARLY_ACCESS = "BOT_DEVELOPER_EARLY_ACCESS",
    GUILD_HOME_TEST = "GUILD_HOME_TEST",
    HAD_EARLY_ACTIVITIES_ACCESS = "HAD_EARLY_ACTIVITIES_ACCESS",
    EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT = "EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT",
    INTERNAL_EMPLOYEE_ONLY = "INTERNAL_EMPLOYEE_ONLY"
}
export declare const GuildFeaturesText: Record<GuildFeature, string>;
export declare const GuildFeaturesEmojis: Record<GuildFeature, CustomEmojis>;
