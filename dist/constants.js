"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emojis = exports.derive = exports.tab = exports.tail = exports.GuildFeaturesEmojis = exports.GuildFeaturesText = exports.GuildFeature = exports.GuildPublicStatesText = exports.GuildMfaLevelsText = exports.GuildExplicitContentFiltersText = exports.GuildVerificationLevelsText = exports.VoiceRegionsText = exports.GuildVoiceRegion = exports.StagePrivacyLevelsText = exports.VideoQualityModesText = exports.BooleanText = exports.ChannelTypesText = exports.UserBadges = exports.IrrelevantPermissions = exports.BrandIcons = exports.BrandColours = exports.BrandNames = exports.Brand = exports.Colours = exports.TRUSTED_URLS = exports.UNICODE_EMOJI_REGEX = exports.VALID_URL_REGEX = exports.PermissionsText = exports.Permissions = void 0;
const constants_1 = require("detritus-client/lib/constants");
const emojis_1 = require("./emojis");
exports.Permissions = {
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
exports.PermissionsText = {
    [String(exports.Permissions.NONE)]: "None",
    [String(exports.Permissions.CREATE_INSTANT_INVITE)]: "Create Instant Invite",
    [String(exports.Permissions.KICK_MEMBERS)]: "Kick Members",
    [String(exports.Permissions.BAN_MEMBERS)]: "Ban Members",
    [String(exports.Permissions.ADMINISTRATOR)]: "Administrator",
    [String(exports.Permissions.MANAGE_CHANNELS)]: "Manage Channels",
    [String(exports.Permissions.MANAGE_GUILD)]: "Manage Guild",
    [String(exports.Permissions.ADD_REACTIONS)]: "Add Reactions",
    [String(exports.Permissions.VIEW_AUDIT_LOG)]: "View Audit Log",
    [String(exports.Permissions.PRIORITY_SPEAKER)]: "Priority Speaker",
    [String(exports.Permissions.STREAM)]: "Stream",
    [String(exports.Permissions.VIEW_CHANNEL)]: "View Channel",
    [String(exports.Permissions.SEND_MESSAGES)]: "Send Messages",
    [String(exports.Permissions.SEND_TTS_MESSAGES)]: "Send Messages (Text-To-Speech)",
    [String(exports.Permissions.MANAGE_MESSAGES)]: "Manage Messages",
    [String(exports.Permissions.EMBED_LINKS)]: "Embed Links",
    [String(exports.Permissions.ATTACH_FILES)]: "Attach Files",
    [String(exports.Permissions.READ_MESSAGE_HISTORY)]: "Read Message History",
    [String(exports.Permissions.MENTION_EVERYONE)]: "Mention Everyone",
    [String(exports.Permissions.USE_EXTERNAL_EMOJIS)]: "Use External Emojis",
    [String(exports.Permissions.VIEW_GUILD_ANALYTICS)]: "View Guild Analytics",
    [String(exports.Permissions.CONNECT)]: "Connect",
    [String(exports.Permissions.SPEAK)]: "Speak",
    [String(exports.Permissions.MUTE_MEMBERS)]: "Mute Members",
    [String(exports.Permissions.DEAFEN_MEMBERS)]: "Deafen Members",
    [String(exports.Permissions.MOVE_MEMBERS)]: "Move Members",
    [String(exports.Permissions.USE_VAD)]: "Use VAD",
    [String(exports.Permissions.CHANGE_NICKNAME)]: "Change Nickname",
    [String(exports.Permissions.CHANGE_NICKNAMES)]: "Manage Nicknames",
    [String(exports.Permissions.MANAGE_ROLES)]: "Manage Roles",
    [String(exports.Permissions.MANAGE_WEBHOOKS)]: "Manage Webhooks",
    [String(exports.Permissions.MANAGE_EMOJIS)]: "Manage Emojis",
    [String(exports.Permissions.USE_APPLICATION_COMMANDS)]: "Use Application Commands",
    [String(exports.Permissions.REQUEST_TO_SPEAK)]: "Request To Speak",
    [String(exports.Permissions.MANAGE_EVENTS)]: "Manage Events",
    [String(exports.Permissions.USE_PUBLIC_THREADS)]: "Use Public Threads",
    [String(exports.Permissions.USE_PRIVATE_THREADS)]: "Use Private Threads",
    [String(exports.Permissions.USE_EXTERNAL_STICKERS)]: "Use External Stickers",
    [String(exports.Permissions.SEND_MESSAGES_IN_THREADS)]: "Send Messages In Threads",
    [String(exports.Permissions.USE_EMBEDDED_ACTIVITES)]: "Use Embedded Activities",
    [String(exports.Permissions.MODERATE_MEMBERS)]: "Moderate Members",
};
exports.VALID_URL_REGEX = /^(?:(?:(?:https?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
exports.UNICODE_EMOJI_REGEX = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;
exports.TRUSTED_URLS = [
    "cdn.discordapp.com",
    "images-ext-1.discordapp.net",
    "images-ext-2.discordapp.net",
    "media.discordapp.net",
];
var Colours;
(function (Colours) {
    Colours[Colours["DEFAULT"] = 0] = "DEFAULT";
    Colours[Colours["AQUA"] = 1752220] = "AQUA";
    Colours[Colours["DARK_AQUA"] = 1146986] = "DARK_AQUA";
    Colours[Colours["GREEN"] = 3066993] = "GREEN";
    Colours[Colours["DARK_GREEN"] = 2067276] = "DARK_GREEN";
    Colours[Colours["BLUE"] = 3447003] = "BLUE";
    Colours[Colours["DARK_BLUE"] = 2123412] = "DARK_BLUE";
    Colours[Colours["PURPLE"] = 10181046] = "PURPLE";
    Colours[Colours["DARK_PURPLE"] = 7419530] = "DARK_PURPLE";
    Colours[Colours["LUMINOUS_VIVID_PINK"] = 15277667] = "LUMINOUS_VIVID_PINK";
    Colours[Colours["DARK_VIVID_PINK"] = 11342935] = "DARK_VIVID_PINK";
    Colours[Colours["GOLD"] = 15844367] = "GOLD";
    Colours[Colours["DARK_GOLD"] = 12745742] = "DARK_GOLD";
    Colours[Colours["ORANGE"] = 15105570] = "ORANGE";
    Colours[Colours["DARK_ORANGE"] = 11027200] = "DARK_ORANGE";
    Colours[Colours["RED"] = 15158332] = "RED";
    Colours[Colours["DARK_RED"] = 10038562] = "DARK_RED";
    Colours[Colours["GREY"] = 9807270] = "GREY";
    Colours[Colours["DARK_GREY"] = 7109249] = "DARK_GREY";
    Colours[Colours["DARKER_GREY"] = 7506394] = "DARKER_GREY";
    Colours[Colours["LIGHTER_GREY"] = 12436423] = "LIGHTER_GREY";
    Colours[Colours["NAVY"] = 3426654] = "NAVY";
    Colours[Colours["DARK_NAVY"] = 2899536] = "DARK_NAVY";
    Colours[Colours["YELLOW"] = 15844367] = "YELLOW";
    Colours[Colours["SILVER"] = 6323595] = "SILVER";
    Colours[Colours["DARK_SILVER"] = 5533306] = "DARK_SILVER";
    Colours[Colours["WHITE"] = 16777215] = "WHITE";
    Colours[Colours["BLURPLE"] = 5793266] = "BLURPLE";
    Colours[Colours["GREYPLE"] = 10070709] = "GREYPLE";
    Colours[Colours["DARK_BUT_NOT_BLACK"] = 2895667] = "DARK_BUT_NOT_BLACK";
    Colours[Colours["BRAND_GREEN"] = 5763719] = "BRAND_GREEN";
    Colours[Colours["BRAND_YELLOW"] = 16705372] = "BRAND_YELLOW";
    Colours[Colours["BRAND_FUCHSIA"] = 15418782] = "BRAND_FUCHSIA";
    Colours[Colours["BRAND_RED"] = 15548997] = "BRAND_RED";
    Colours[Colours["BRAND_BLACK"] = 2303786] = "BRAND_BLACK";
    Colours[Colours["BACKGROUND"] = 3553599] = "BACKGROUND";
    Colours[Colours["EMBED"] = 3092790] = "EMBED";
})(Colours = exports.Colours || (exports.Colours = {}));
var Brand;
(function (Brand) {
    Brand["VYBOSE"] = "vybose";
    Brand["IMAGGA"] = "imagga";
    Brand["PXL"] = "pxl-api";
})(Brand = exports.Brand || (exports.Brand = {}));
exports.BrandNames = {
    [Brand.VYBOSE]: "Vybose",
    [Brand.IMAGGA]: "Imagga",
    [Brand.PXL]: "PXL API",
};
exports.BrandColours = {
    [Brand.VYBOSE]: Colours.PURPLE,
    [Brand.IMAGGA]: Colours.AQUA,
    [Brand.PXL]: Colours.WHITE,
};
exports.BrandIcons = {
    [Brand.VYBOSE]: new URL("https://rqft.space/i/image/vybost.png"),
    [Brand.IMAGGA]: new URL("https://www.programmableweb.com/sites/default/files/imagga_logo_small_500x288px.png"),
    [Brand.PXL]: new URL("https://pxlapi.dev/images/logo-small-transparent.png"),
};
exports.IrrelevantPermissions = [
    exports.Permissions.NONE,
    exports.Permissions.CREATE_INSTANT_INVITE,
    exports.Permissions.ADD_REACTIONS,
    exports.Permissions.STREAM,
    exports.Permissions.VIEW_CHANNEL,
    exports.Permissions.SEND_MESSAGES,
    exports.Permissions.SEND_TTS_MESSAGES,
    exports.Permissions.EMBED_LINKS,
    exports.Permissions.ATTACH_FILES,
    exports.Permissions.READ_MESSAGE_HISTORY,
    exports.Permissions.USE_EXTERNAL_EMOJIS,
    exports.Permissions.CONNECT,
    exports.Permissions.SPEAK,
    exports.Permissions.USE_VAD,
    exports.Permissions.CHANGE_NICKNAME,
    exports.Permissions.VIEW_GUILD_ANALYTICS,
    exports.Permissions.VIEW_AUDIT_LOG,
    exports.Permissions.PRIORITY_SPEAKER,
    exports.Permissions.USE_APPLICATION_COMMANDS,
    exports.Permissions.REQUEST_TO_SPEAK,
    exports.Permissions.USE_PUBLIC_THREADS,
    exports.Permissions.USE_PRIVATE_THREADS,
    exports.Permissions.USE_EMBEDDED_ACTIVITES,
    exports.Permissions.USE_EXTERNAL_STICKERS,
    exports.Permissions.SEND_MESSAGES_IN_THREADS,
];
exports.UserBadges = {
    [constants_1.UserFlags.BUG_HUNTER_LEVEL_1]: "<:BadgeBugHunter:1026592024197087303>",
    [constants_1.UserFlags.BUG_HUNTER_LEVEL_2]: "<:BadgeBugHunter2:1026592025535058052>",
    [constants_1.UserFlags.DISCORD_CERTIFIED_MODERATOR]: "<:BadgeCertifiedModerator:1026592026457813072>",
    [constants_1.UserFlags.HAS_UNREAD_URGENT_MESSAGES]: emojis_1.Emojis.WARNING,
    [constants_1.UserFlags.HYPESQUAD]: "<:BadgeHypesquadEvents:1026592027359596665>",
    [constants_1.UserFlags.HYPESQUAD_ONLINE_HOUSE_1]: "<:BadgeBravery:1026592022842331156>",
    [constants_1.UserFlags.HYPESQUAD_ONLINE_HOUSE_2]: "<:BadgeBrilliance:1026592023710552174>",
    [constants_1.UserFlags.HYPESQUAD_ONLINE_HOUSE_3]: "<:BadgeBalance:1026592012650160158>",
    [constants_1.UserFlags.MFA_SMS]: "<:WarningBox:1026594241977266256>",
    [constants_1.UserFlags.PARTNER]: "<:BadgePartner:1026592028622061608>",
    [constants_1.UserFlags.PREMIUM_EARLY_SUPPORTER]: "<:BadgeEarlySupporter:1026606289838678169>",
    [constants_1.UserFlags.PREMIUM_PROMO_DISMISSED]: emojis_1.Emojis.TRIANGULAR_FLAG_ON_POST,
    [constants_1.UserFlags.STAFF]: "<:BadgeStaff:1026592030459187340>",
    [constants_1.UserFlags.SYSTEM]: emojis_1.Emojis.GEAR,
    [constants_1.UserFlags.TEAM_USER]: emojis_1.Emojis.GEAR,
    [constants_1.UserFlags.VERIFIED_BOT]: "<:Allow:1026592635755962438>",
    [constants_1.UserFlags.VERIFIED_DEVELOPER]: "<:BadgeBotDeveloper:1026592022095736882>",
};
exports.ChannelTypesText = {
    [constants_1.ChannelTypes.BASE]: "Channel",
    [constants_1.ChannelTypes.DM]: "Direct Message",
    [constants_1.ChannelTypes.GROUP_DM]: "Group Direct Message",
    [constants_1.ChannelTypes.GUILD_CATEGORY]: "Category",
    [constants_1.ChannelTypes.GUILD_DIRECTORY]: "Directory",
    [constants_1.ChannelTypes.GUILD_FORUM]: "Forum",
    [constants_1.ChannelTypes.GUILD_NEWS]: "News",
    [constants_1.ChannelTypes.GUILD_NEWS_THREAD]: "News Thread",
    [constants_1.ChannelTypes.GUILD_PRIVATE_THREAD]: "Private Thread",
    [constants_1.ChannelTypes.GUILD_PUBLIC_THREAD]: "Public Thread",
    [constants_1.ChannelTypes.GUILD_STAGE_VOICE]: "Stage",
    [constants_1.ChannelTypes.GUILD_STORE]: "Store",
    [constants_1.ChannelTypes.GUILD_TEXT]: "Text",
    [constants_1.ChannelTypes.GUILD_VOICE]: "Voice",
};
function BooleanText(value) {
    return value ? "Yes" : "No";
}
exports.BooleanText = BooleanText;
exports.VideoQualityModesText = {
    [constants_1.ChannelVideoQualityModes.AUTO]: "Auto",
    [constants_1.ChannelVideoQualityModes.FULL]: "720p",
};
exports.StagePrivacyLevelsText = {
    [constants_1.StagePrivacyLevels.PUBLIC]: "Public",
    [constants_1.StagePrivacyLevels.GUILD_ONLY]: "Server Only",
};
var GuildVoiceRegion;
(function (GuildVoiceRegion) {
    GuildVoiceRegion["BRAZIL"] = "brazil";
    GuildVoiceRegion["EU_CENTRAL"] = "eu-central";
    GuildVoiceRegion["EU_WEST"] = "eu-west";
    GuildVoiceRegion["EUROPE"] = "europe";
    GuildVoiceRegion["HONGKONG"] = "hongkong";
    GuildVoiceRegion["INDIA"] = "india";
    GuildVoiceRegion["JAPAN"] = "japan";
    GuildVoiceRegion["RUSSIA"] = "russia";
    GuildVoiceRegion["SINGAPORE"] = "singapore";
    GuildVoiceRegion["SOUTHAFRICA"] = "southafrica";
    GuildVoiceRegion["SYDNEY"] = "sydney";
    GuildVoiceRegion["SOUTH_KOREA"] = "south-korea";
    GuildVoiceRegion["US_CENTRAL"] = "us-central";
    GuildVoiceRegion["US_EAST"] = "us-east";
    GuildVoiceRegion["US_SOUTH"] = "us-south";
    GuildVoiceRegion["US_WEST"] = "us-west";
    GuildVoiceRegion["DEPRECATED"] = "deprecated";
})(GuildVoiceRegion = exports.GuildVoiceRegion || (exports.GuildVoiceRegion = {}));
exports.VoiceRegionsText = {
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
exports.GuildVerificationLevelsText = {
    [constants_1.VerificationLevels.NONE]: "None",
    [constants_1.VerificationLevels.LOW]: "Low",
    [constants_1.VerificationLevels.MEDIUM]: "Medium",
    [constants_1.VerificationLevels.HIGH]: "High",
    [constants_1.VerificationLevels.VERY_HIGH]: "Very High",
};
exports.GuildExplicitContentFiltersText = {
    [constants_1.GuildExplicitContentFilterTypes.DISABLED]: "Disabled",
    [constants_1.GuildExplicitContentFilterTypes.MEMBERS_WITHOUT_ROLES]: "Members Without Roles",
    [constants_1.GuildExplicitContentFilterTypes.ALL_MEMBERS]: "All Members",
};
exports.GuildMfaLevelsText = {
    [constants_1.MfaLevels.NONE]: "None",
    [constants_1.MfaLevels.ELEVATED]: "Elevated",
};
exports.GuildPublicStatesText = {
    [String(true)]: "Public",
    [String(false)]: "Private",
};
var GuildFeature;
(function (GuildFeature) {
    GuildFeature["INVITE_SPLASH"] = "INVITE_SPLASH";
    GuildFeature["VIP_REGIONS"] = "VIP_REGIONS";
    GuildFeature["VANITY_URL"] = "VANITY_URL";
    GuildFeature["VERIFIED"] = "VERIFIED";
    GuildFeature["PARTNERED"] = "PARTNERED";
    GuildFeature["PUBLIC"] = "PUBLIC";
    GuildFeature["COMMERCE"] = "COMMERCE";
    GuildFeature["NEWS"] = "NEWS";
    GuildFeature["DISCOVERABLE"] = "DISCOVERABLE";
    GuildFeature["FEATURABLE"] = "FEATURABLE";
    GuildFeature["ANIMATED_ICON"] = "ANIMATED_ICON";
    GuildFeature["BANNER"] = "BANNER";
    GuildFeature["PUBLIC_DISABLED"] = "PUBLIC_DISABLED";
    GuildFeature["WELCOME_SCREEN_ENABLED"] = "WELCOME_SCREEN_ENABLED";
    GuildFeature["MEMBER_VERIFICATION_GATE_ENABLED"] = "MEMBER_VERIFICATION_GATE_ENABLED";
    GuildFeature["ENABLED_DISCOVERABLE_BEFORE"] = "ENABLED_DISCOVERABLE_BEFORE";
    GuildFeature["COMMUNITY"] = "COMMUNITY";
    GuildFeature["PREVIEW_ENABLED"] = "PREVIEW_ENABLED";
    GuildFeature["MEMBER_LIST_DISABLED"] = "MEMBER_LIST_DISABLED";
    GuildFeature["MORE_EMOJI"] = "MORE_EMOJI";
    GuildFeature["RELAY_ENABLED"] = "RELAY_ENABLED";
    GuildFeature["DISCOVERABLE_DISABLED"] = "DISCOVERABLE_DISABLED";
    GuildFeature["MONETIZATION_ENABLED"] = "MONETIZATION_ENABLED";
    GuildFeature["TICKETED_EVENTS_ENABLED"] = "TICKETED_EVENTS_ENABLED";
    GuildFeature["PRIVATE_THREADS"] = "PRIVATE_THREADS";
    GuildFeature["SEVEN_DAY_THREAD_ARCHIVE"] = "SEVEN_DAY_THREAD_ARCHIVE";
    GuildFeature["THREE_DAY_THREAD_ARCHIVE"] = "THREE_DAY_THREAD_ARCHIVE";
    GuildFeature["THREADS_ENABLED"] = "THREADS_ENABLED";
    GuildFeature["ROLE_ICONS"] = "ROLE_ICONS";
    GuildFeature["NEW_THREAD_PERMISSIONS"] = "NEW_THREAD_PERMISSIONS";
    GuildFeature["THREADS_ENABLED_TESTING"] = "THREADS_ENABLED_TESTING";
    GuildFeature["HUB"] = "HUB";
    GuildFeature["ANIMATED_BANNER"] = "ANIMATED_BANNER";
    GuildFeature["HAS_DIRECTORY_ENTRY"] = "HAS_DIRECTORY_ENTRY";
    GuildFeature["MEMBER_PROFILES"] = "MEMBER_PROFILES";
    GuildFeature["AUTO_MODERATION"] = "AUTO_MODERATION";
    GuildFeature["TEXT_IN_VOICE_ENABLED"] = "TEXT_IN_VOICE_ENABLED";
    GuildFeature["BOT_DEVELOPER_EARLY_ACCESS"] = "BOT_DEVELOPER_EARLY_ACCESS";
    GuildFeature["GUILD_HOME_TEST"] = "GUILD_HOME_TEST";
    GuildFeature["HAD_EARLY_ACTIVITIES_ACCESS"] = "HAD_EARLY_ACTIVITIES_ACCESS";
    GuildFeature["EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT"] = "EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT";
    GuildFeature["INTERNAL_EMPLOYEE_ONLY"] = "INTERNAL_EMPLOYEE_ONLY";
})(GuildFeature = exports.GuildFeature || (exports.GuildFeature = {}));
exports.GuildFeaturesText = {
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
    [GuildFeature.MEMBER_PROFILES]: "Member Profiles",
    [GuildFeature.AUTO_MODERATION]: "Auto Moderation",
    [GuildFeature.TEXT_IN_VOICE_ENABLED]: "Text In Voice Enabled",
    [GuildFeature.BOT_DEVELOPER_EARLY_ACCESS]: "Bot Developer Early Access",
    [GuildFeature.GUILD_HOME_TEST]: "Guild Home Test",
    [GuildFeature.HAD_EARLY_ACTIVITIES_ACCESS]: "Had Early Activities Access",
    [GuildFeature.EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT]: "Exposed to Activities WTP Experiment",
    [GuildFeature.INTERNAL_EMPLOYEE_ONLY]: "Internal Employee Only",
};
exports.GuildFeaturesEmojis = {
    [GuildFeature.INVITE_SPLASH]: "<:Person:1026593940062871692>",
    [GuildFeature.VIP_REGIONS]: "<:Speaker:1026594073877954623>",
    [GuildFeature.VANITY_URL]: "<:SparklePlus:1026594071977938945>",
    [GuildFeature.VERIFIED]: "<:Favorite:1026593895313838160>",
    [GuildFeature.PARTNERED]: "<:GuildPartner:1026592659256660048>",
    [GuildFeature.PUBLIC]: "<:Discover:1026593435559407648>",
    [GuildFeature.COMMERCE]: "<:StoreTag:1026594093511479326>",
    [GuildFeature.NEWS]: "<:Megaphone:1026593921670848583>",
    [GuildFeature.DISCOVERABLE]: "<:Discover:1026593435559407648>",
    [GuildFeature.FEATURABLE]: "<:Discover:1026593435559407648>",
    [GuildFeature.ANIMATED_ICON]: "<:InvertedGIFLabel:1026593913248677978>",
    [GuildFeature.BANNER]: "<:ImagePlaceholder:1026593909247316008>",
    [GuildFeature.PUBLIC_DISABLED]: "<:Discover:1026593435559407648>",
    [GuildFeature.WELCOME_SCREEN_ENABLED]: "<:ChannelCategory:1026593420791255040>",
    [GuildFeature.MEMBER_VERIFICATION_GATE_ENABLED]: "<:EarlyAccess:1026593392450351214>",
    [GuildFeature.ENABLED_DISCOVERABLE_BEFORE]: "<:Discover:1026593435559407648>",
    [GuildFeature.COMMUNITY]: "<:Person:1026593940062871692>",
    [GuildFeature.PREVIEW_ENABLED]: "<:Discover:1026593435559407648>",
    [GuildFeature.MEMBER_LIST_DISABLED]: "<:Person:1026593940062871692>",
    [GuildFeature.MORE_EMOJI]: "<:EmojiSmile:1026593400864116880>",
    [GuildFeature.RELAY_ENABLED]: "<:Launch:1026593915572334703>",
    [GuildFeature.DISCOVERABLE_DISABLED]: "<:Discover:1026593435559407648>",
    [GuildFeature.MONETIZATION_ENABLED]: "<:Ticket:1026594235333476362>",
    [GuildFeature.TICKETED_EVENTS_ENABLED]: "<:Ticket:1026594235333476362>",
    [GuildFeature.PRIVATE_THREADS]: "<:PrivateThreadIcon:1026594059512451225>",
    [GuildFeature.SEVEN_DAY_THREAD_ARCHIVE]: "<:ThreadIcon:1026594234482049074>",
    [GuildFeature.THREE_DAY_THREAD_ARCHIVE]: "<:ThreadIcon:1026594234482049074>",
    [GuildFeature.THREADS_ENABLED]: "<:ThreadIcon:1026594234482049074>",
    [GuildFeature.ROLE_ICONS]: "<:StarBadge:1026594085034786826>",
    [GuildFeature.NEW_THREAD_PERMISSIONS]: "<:ThreadIcon:1026594234482049074>",
    [GuildFeature.THREADS_ENABLED_TESTING]: "<:ThreadIcon:1026594234482049074>",
    [GuildFeature.HUB]: "<:Education:1026593393230491691>",
    [GuildFeature.ANIMATED_BANNER]: "<:InvertedGIFLabel:1026593913248677978>",
    [GuildFeature.HAS_DIRECTORY_ENTRY]: "<:ChannelDirectory:1026593421479116844>",
    [GuildFeature.MEMBER_PROFILES]: "<:Person:1026593940062871692>",
    [GuildFeature.AUTO_MODERATION]: "<:ChannelRules:1026593422749990912>",
    [GuildFeature.TEXT_IN_VOICE_ENABLED]: "<:SpeakerLimited:1026594075308212325>",
    [GuildFeature.BOT_DEVELOPER_EARLY_ACCESS]: "<:RichActivity:1026594063383797872>",
    [GuildFeature.GUILD_HOME_TEST]: "<:RichActivity:1026594063383797872>",
    [GuildFeature.HAD_EARLY_ACTIVITIES_ACCESS]: "<:RichActivity:1026594063383797872>",
    [GuildFeature.EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT]: "<:RichActivity:1026594063383797872>",
    [GuildFeature.INTERNAL_EMPLOYEE_ONLY]: "<:RichActivity:1026594063383797872>",
};
exports.tail = "❯";
exports.tab = "\u2003\u200b";
exports.derive = "└─";
exports.emojis = [];
