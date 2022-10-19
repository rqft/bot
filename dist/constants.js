"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emojis = exports.bar = exports.derive = exports.delve = exports.tab = exports.tail = exports.GuildNsfwLevelsText = exports.GuildFeaturesEmojis = exports.GuildFeaturesText = exports.GuildFeature = exports.GuildPublicStatesText = exports.GuildMfaLevelsText = exports.GuildExplicitContentFiltersText = exports.GuildVerificationLevelsText = exports.VoiceRegionsText = exports.GuildVoiceRegion = exports.StagePrivacyLevelsText = exports.VideoQualityModesText = exports.BooleanText = exports.StatusesText = exports.StatusEmojis = exports.ChannelTypesText = exports.UserBadges = exports.IrrelevantPermissions = exports.BrandIcons = exports.BrandColours = exports.BrandNames = exports.Brand = exports.Colours = exports.TRUSTED_URLS = exports.UNICODE_EMOJI_REGEX = exports.VALID_URL_REGEX = exports.PermissionsText = exports.Permissions = void 0;
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
    [String(exports.Permissions.NONE)]: 'None',
    [String(exports.Permissions.CREATE_INSTANT_INVITE)]: 'Create Instant Invite',
    [String(exports.Permissions.KICK_MEMBERS)]: 'Kick Members',
    [String(exports.Permissions.BAN_MEMBERS)]: 'Ban Members',
    [String(exports.Permissions.ADMINISTRATOR)]: 'Administrator',
    [String(exports.Permissions.MANAGE_CHANNELS)]: 'Manage Channels',
    [String(exports.Permissions.MANAGE_GUILD)]: 'Manage Guild',
    [String(exports.Permissions.ADD_REACTIONS)]: 'Add Reactions',
    [String(exports.Permissions.VIEW_AUDIT_LOG)]: 'View Audit Log',
    [String(exports.Permissions.PRIORITY_SPEAKER)]: 'Priority Speaker',
    [String(exports.Permissions.STREAM)]: 'Stream',
    [String(exports.Permissions.VIEW_CHANNEL)]: 'View Channel',
    [String(exports.Permissions.SEND_MESSAGES)]: 'Send Messages',
    [String(exports.Permissions.SEND_TTS_MESSAGES)]: 'Send Messages (Text-To-Speech)',
    [String(exports.Permissions.MANAGE_MESSAGES)]: 'Manage Messages',
    [String(exports.Permissions.EMBED_LINKS)]: 'Embed Links',
    [String(exports.Permissions.ATTACH_FILES)]: 'Attach Files',
    [String(exports.Permissions.READ_MESSAGE_HISTORY)]: 'Read Message History',
    [String(exports.Permissions.MENTION_EVERYONE)]: 'Mention Everyone',
    [String(exports.Permissions.USE_EXTERNAL_EMOJIS)]: 'Use External Emojis',
    [String(exports.Permissions.VIEW_GUILD_ANALYTICS)]: 'View Guild Analytics',
    [String(exports.Permissions.CONNECT)]: 'Connect',
    [String(exports.Permissions.SPEAK)]: 'Speak',
    [String(exports.Permissions.MUTE_MEMBERS)]: 'Mute Members',
    [String(exports.Permissions.DEAFEN_MEMBERS)]: 'Deafen Members',
    [String(exports.Permissions.MOVE_MEMBERS)]: 'Move Members',
    [String(exports.Permissions.USE_VAD)]: 'Use VAD',
    [String(exports.Permissions.CHANGE_NICKNAME)]: 'Change Nickname',
    [String(exports.Permissions.CHANGE_NICKNAMES)]: 'Manage Nicknames',
    [String(exports.Permissions.MANAGE_ROLES)]: 'Manage Roles',
    [String(exports.Permissions.MANAGE_WEBHOOKS)]: 'Manage Webhooks',
    [String(exports.Permissions.MANAGE_EMOJIS)]: 'Manage Emojis',
    [String(exports.Permissions.USE_APPLICATION_COMMANDS)]: 'Use Application Commands',
    [String(exports.Permissions.REQUEST_TO_SPEAK)]: 'Request To Speak',
    [String(exports.Permissions.MANAGE_EVENTS)]: 'Manage Events',
    [String(exports.Permissions.USE_PUBLIC_THREADS)]: 'Use Public Threads',
    [String(exports.Permissions.USE_PRIVATE_THREADS)]: 'Use Private Threads',
    [String(exports.Permissions.USE_EXTERNAL_STICKERS)]: 'Use External Stickers',
    [String(exports.Permissions.SEND_MESSAGES_IN_THREADS)]: 'Send Messages In Threads',
    [String(exports.Permissions.USE_EMBEDDED_ACTIVITES)]: 'Use Embedded Activities',
    [String(exports.Permissions.MODERATE_MEMBERS)]: 'Moderate Members',
};
exports.VALID_URL_REGEX = /^(?:(?:(?:https?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
exports.UNICODE_EMOJI_REGEX = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;
exports.TRUSTED_URLS = [
    'cdn.discordapp.com',
    'images-ext-1.discordapp.net',
    'images-ext-2.discordapp.net',
    'media.discordapp.net',
];
var Colours;
(function (Colours) {
    Colours[Colours["Default"] = 0] = "Default";
    Colours[Colours["Aqua"] = 1752220] = "Aqua";
    Colours[Colours["DarkAqua"] = 1146986] = "DarkAqua";
    Colours[Colours["Green"] = 3066993] = "Green";
    Colours[Colours["DarkGreen"] = 2067276] = "DarkGreen";
    Colours[Colours["Blue"] = 3447003] = "Blue";
    Colours[Colours["DarkBlue"] = 2123412] = "DarkBlue";
    Colours[Colours["Purple"] = 10181046] = "Purple";
    Colours[Colours["DarkPurple"] = 7419530] = "DarkPurple";
    Colours[Colours["LuminousVividPink"] = 15277667] = "LuminousVividPink";
    Colours[Colours["DarkVividPink"] = 11342935] = "DarkVividPink";
    Colours[Colours["Gold"] = 15844367] = "Gold";
    Colours[Colours["DarkGold"] = 12745742] = "DarkGold";
    Colours[Colours["Orange"] = 15105570] = "Orange";
    Colours[Colours["DarkOrange"] = 11027200] = "DarkOrange";
    Colours[Colours["Red"] = 15158332] = "Red";
    Colours[Colours["DarkRed"] = 10038562] = "DarkRed";
    Colours[Colours["Grey"] = 9807270] = "Grey";
    Colours[Colours["DarkGrey"] = 7109249] = "DarkGrey";
    Colours[Colours["DarkerGrey"] = 7506394] = "DarkerGrey";
    Colours[Colours["LighterGrey"] = 12436423] = "LighterGrey";
    Colours[Colours["Navy"] = 3426654] = "Navy";
    Colours[Colours["DarkNavy"] = 2899536] = "DarkNavy";
    Colours[Colours["Yellow"] = 15844367] = "Yellow";
    Colours[Colours["Silver"] = 6323595] = "Silver";
    Colours[Colours["DarkSilver"] = 5533306] = "DarkSilver";
    Colours[Colours["White"] = 16777215] = "White";
    Colours[Colours["Blurple"] = 5793266] = "Blurple";
    Colours[Colours["Greyple"] = 10070709] = "Greyple";
    Colours[Colours["DarkButNotBlack"] = 2895667] = "DarkButNotBlack";
    Colours[Colours["BrandGreen"] = 5763719] = "BrandGreen";
    Colours[Colours["BrandYellow"] = 16705372] = "BrandYellow";
    Colours[Colours["BrandFuchsia"] = 15418782] = "BrandFuchsia";
    Colours[Colours["BrandRed"] = 15548997] = "BrandRed";
    Colours[Colours["BrandBlack"] = 2303786] = "BrandBlack";
    Colours[Colours["Background"] = 3553599] = "Background";
    Colours[Colours["Embed"] = 3092790] = "Embed";
})(Colours = exports.Colours || (exports.Colours = {}));
var Brand;
(function (Brand) {
    Brand["VYBOSE"] = "vybose";
    Brand["IMAGGA"] = "imagga";
    Brand["PXL"] = "pxl-api";
})(Brand = exports.Brand || (exports.Brand = {}));
exports.BrandNames = {
    [Brand.VYBOSE]: 'Vybose',
    [Brand.IMAGGA]: 'Imagga',
    [Brand.PXL]: 'PXL API',
};
exports.BrandColours = {
    [Brand.VYBOSE]: Colours.Purple,
    [Brand.IMAGGA]: Colours.Aqua,
    [Brand.PXL]: Colours.White,
};
exports.BrandIcons = {
    [Brand.VYBOSE]: new URL('https://rqft.space/i/image/vybost.png'),
    [Brand.IMAGGA]: new URL('https://www.programmableweb.com/sites/default/files/imagga_logo_small_500x288px.png'),
    [Brand.PXL]: new URL('https://pxlapi.dev/images/logo-small-transparent.png'),
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
    [constants_1.UserFlags.HAS_UNREAD_URGENT_MESSAGES]: emojis_1.Emojis.Warning,
    [constants_1.UserFlags.HYPESQUAD]: "<:BadgeHypesquadEvents:1026592027359596665>",
    [constants_1.UserFlags.HYPESQUAD_ONLINE_HOUSE_1]: "<:BadgeBravery:1026592022842331156>",
    [constants_1.UserFlags.HYPESQUAD_ONLINE_HOUSE_2]: "<:BadgeBrilliance:1026592023710552174>",
    [constants_1.UserFlags.HYPESQUAD_ONLINE_HOUSE_3]: "<:BadgeBalance:1026592012650160158>",
    [constants_1.UserFlags.MFA_SMS]: "<:WarningBox:1026594241977266256>",
    [constants_1.UserFlags.PARTNER]: "<:BadgePartner:1026592028622061608>",
    [constants_1.UserFlags.PREMIUM_EARLY_SUPPORTER]: "<:BadgeEarlySupporter:1026606289838678169>",
    [constants_1.UserFlags.PREMIUM_PROMO_DISMISSED]: emojis_1.Emojis.TriangularFlagOnPost,
    [constants_1.UserFlags.STAFF]: "<:BadgeStaff:1026592030459187340>",
    [constants_1.UserFlags.SYSTEM]: emojis_1.Emojis.Gear,
    [constants_1.UserFlags.TEAM_USER]: emojis_1.Emojis.Gear,
    [constants_1.UserFlags.VERIFIED_BOT]: "<:Allow:1026592635755962438>",
    [constants_1.UserFlags.VERIFIED_DEVELOPER]: "<:BadgeBotDeveloper:1026592022095736882>",
};
exports.ChannelTypesText = {
    [constants_1.ChannelTypes.BASE]: 'Channel',
    [constants_1.ChannelTypes.DM]: 'Direct Message',
    [constants_1.ChannelTypes.GROUP_DM]: 'Group Direct Message',
    [constants_1.ChannelTypes.GUILD_CATEGORY]: 'Category',
    [constants_1.ChannelTypes.GUILD_DIRECTORY]: 'Directory',
    [constants_1.ChannelTypes.GUILD_FORUM]: 'Forum',
    [constants_1.ChannelTypes.GUILD_NEWS]: 'News',
    [constants_1.ChannelTypes.GUILD_NEWS_THREAD]: 'News Thread',
    [constants_1.ChannelTypes.GUILD_PRIVATE_THREAD]: 'Private Thread',
    [constants_1.ChannelTypes.GUILD_PUBLIC_THREAD]: 'Public Thread',
    [constants_1.ChannelTypes.GUILD_STAGE_VOICE]: 'Stage',
    [constants_1.ChannelTypes.GUILD_STORE]: 'Store',
    [constants_1.ChannelTypes.GUILD_TEXT]: 'Text',
    [constants_1.ChannelTypes.GUILD_VOICE]: 'Voice',
};
exports.StatusEmojis = {
    [constants_1.PresenceStatuses.DND]: "<:DoNotDisturb:1029941062216712263>",
    [constants_1.PresenceStatuses.IDLE]: "<:Idle:1029941063105925120>",
    [constants_1.PresenceStatuses.INVISIBLE]: "<:Offline:1029941237916110848>",
    [constants_1.PresenceStatuses.OFFLINE]: "<:Offline:1029941237916110848>",
    [constants_1.PresenceStatuses.ONLINE]: "<:Online:1029941068294279238>",
};
exports.StatusesText = {
    [constants_1.PresenceStatuses.DND]: 'Do Not Disturb',
    [constants_1.PresenceStatuses.IDLE]: 'Idle',
    [constants_1.PresenceStatuses.INVISIBLE]: 'Invisible',
    [constants_1.PresenceStatuses.OFFLINE]: 'Offline',
    [constants_1.PresenceStatuses.ONLINE]: 'Online',
};
function BooleanText(value) {
    return value ? 'Yes' : 'No';
}
exports.BooleanText = BooleanText;
exports.VideoQualityModesText = {
    [constants_1.ChannelVideoQualityModes.AUTO]: 'Auto',
    [constants_1.ChannelVideoQualityModes.FULL]: '720p',
};
exports.StagePrivacyLevelsText = {
    [constants_1.StagePrivacyLevels.PUBLIC]: 'Public',
    [constants_1.StagePrivacyLevels.GUILD_ONLY]: 'Server Only',
};
var GuildVoiceRegion;
(function (GuildVoiceRegion) {
    GuildVoiceRegion["Brazil"] = "brazil";
    GuildVoiceRegion["EuCentral"] = "eu-central";
    GuildVoiceRegion["EuWest"] = "eu-west";
    GuildVoiceRegion["Europe"] = "europe";
    GuildVoiceRegion["HongKong"] = "hongkong";
    GuildVoiceRegion["India"] = "india";
    GuildVoiceRegion["Japan"] = "japan";
    GuildVoiceRegion["Russia"] = "russia";
    GuildVoiceRegion["Singapore"] = "singapore";
    GuildVoiceRegion["SouthAfrica"] = "southafrica";
    GuildVoiceRegion["Sydney"] = "sydney";
    GuildVoiceRegion["SouthKorea"] = "south-korea";
    GuildVoiceRegion["UsCentral"] = "us-central";
    GuildVoiceRegion["UsEast"] = "us-east";
    GuildVoiceRegion["UsSouth"] = "us-south";
    GuildVoiceRegion["UsWest"] = "us-west";
    GuildVoiceRegion["Deprecated"] = "deprecated";
})(GuildVoiceRegion = exports.GuildVoiceRegion || (exports.GuildVoiceRegion = {}));
exports.VoiceRegionsText = {
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
exports.GuildVerificationLevelsText = {
    [constants_1.VerificationLevels.NONE]: 'None',
    [constants_1.VerificationLevels.LOW]: 'Low',
    [constants_1.VerificationLevels.MEDIUM]: 'Medium',
    [constants_1.VerificationLevels.HIGH]: 'High',
    [constants_1.VerificationLevels.VERY_HIGH]: 'Very High',
};
exports.GuildExplicitContentFiltersText = {
    [constants_1.GuildExplicitContentFilterTypes.DISABLED]: 'Disabled',
    [constants_1.GuildExplicitContentFilterTypes.MEMBERS_WITHOUT_ROLES]: 'Members Without Roles',
    [constants_1.GuildExplicitContentFilterTypes.ALL_MEMBERS]: 'All Members',
};
exports.GuildMfaLevelsText = {
    [constants_1.MfaLevels.NONE]: 'None',
    [constants_1.MfaLevels.ELEVATED]: 'Elevated',
};
exports.GuildPublicStatesText = {
    [String(true)]: 'Public',
    [String(false)]: 'Private',
};
var GuildFeature;
(function (GuildFeature) {
    GuildFeature["InviteSplash"] = "INVITE_SPLASH";
    GuildFeature["VipRegions"] = "VIP_REGIONS";
    GuildFeature["VanityUrl"] = "VANITY_URL";
    GuildFeature["Verified"] = "VERIFIED";
    GuildFeature["Partnered"] = "PARTNERED";
    GuildFeature["Public"] = "PUBLIC";
    GuildFeature["Commerce"] = "COMMERCE";
    GuildFeature["News"] = "NEWS";
    GuildFeature["Discoverable"] = "DISCOVERABLE";
    GuildFeature["Featurable"] = "FEATURABLE";
    GuildFeature["AnimatedIcon"] = "ANIMATED_ICON";
    GuildFeature["Banner"] = "BANNER";
    GuildFeature["PublicDisabled"] = "PUBLIC_DISABLED";
    GuildFeature["WelcomeScreenEnabled"] = "WELCOME_SCREEN_ENABLED";
    GuildFeature["MemberVerificationGateEnabled"] = "MEMBER_VERIFICATION_GATE_ENABLED";
    GuildFeature["EnabledDiscoverableBefore"] = "ENABLED_DISCOVERABLE_BEFORE";
    GuildFeature["Community"] = "COMMUNITY";
    GuildFeature["PreviewEnabled"] = "PREVIEW_ENABLED";
    GuildFeature["MemberListDisabled"] = "MEMBER_LIST_DISABLED";
    GuildFeature["MoreEmoji"] = "MORE_EMOJI";
    GuildFeature["RelayEnabled"] = "RELAY_ENABLED";
    GuildFeature["DiscoverableDisabled"] = "DISCOVERABLE_DISABLED";
    GuildFeature["MonetizationEnabled"] = "MONETIZATION_ENABLED";
    GuildFeature["TicketedEventsEnabled"] = "TICKETED_EVENTS_ENABLED";
    GuildFeature["PrivateThreads"] = "PRIVATE_THREADS";
    GuildFeature["SevenDayThreadArchive"] = "SEVEN_DAY_THREAD_ARCHIVE";
    GuildFeature["ThreeDayThreadArchive"] = "THREE_DAY_THREAD_ARCHIVE";
    GuildFeature["ThreadsEnabled"] = "THREADS_ENABLED";
    GuildFeature["RoleIcons"] = "ROLE_ICONS";
    GuildFeature["NewThreadPermissions"] = "NEW_THREAD_PERMISSIONS";
    GuildFeature["ThreadsEnabledTesting"] = "THREADS_ENABLED_TESTING";
    GuildFeature["Hub"] = "HUB";
    GuildFeature["AnimatedBanner"] = "ANIMATED_BANNER";
    GuildFeature["HasDirectoryEntry"] = "HAS_DIRECTORY_ENTRY";
    GuildFeature["MemberProfiles"] = "MEMBER_PROFILES";
    GuildFeature["AutoModeration"] = "AUTO_MODERATION";
    GuildFeature["TextInVoiceEnabled"] = "TEXT_IN_VOICE_ENABLED";
    GuildFeature["BotDeveloperEarlyAccess"] = "BOT_DEVELOPER_EARLY_ACCESS";
    GuildFeature["GuildHomeTest"] = "GUILD_HOME_TEST";
    GuildFeature["HadEarlyActivitiesAccess"] = "HAD_EARLY_ACTIVITIES_ACCESS";
    GuildFeature["ExposedToActivitiesWtpExperiment"] = "EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT";
    GuildFeature["InternalEmployeeOnly"] = "INTERNAL_EMPLOYEE_ONLY";
})(GuildFeature = exports.GuildFeature || (exports.GuildFeature = {}));
exports.GuildFeaturesText = {
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
    [GuildFeature.MemberVerificationGateEnabled]: 'Member Verification Gate Enabled',
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
    [GuildFeature.BotDeveloperEarlyAccess]: 'Bot Developer Early Access',
    [GuildFeature.GuildHomeTest]: 'Guild Home Test',
    [GuildFeature.HadEarlyActivitiesAccess]: 'Had Early Activities Access',
    [GuildFeature.ExposedToActivitiesWtpExperiment]: 'Exposed to Activities WTP Experiment',
    [GuildFeature.InternalEmployeeOnly]: 'Internal Employee Only',
};
exports.GuildFeaturesEmojis = {
    [GuildFeature.InviteSplash]: "<:Person:1026593940062871692>",
    [GuildFeature.VipRegions]: "<:Speaker:1026594073877954623>",
    [GuildFeature.VanityUrl]: "<:SparklePlus:1026594071977938945>",
    [GuildFeature.Verified]: "<:Favorite:1026593895313838160>",
    [GuildFeature.Partnered]: "<:GuildPartner:1026592659256660048>",
    [GuildFeature.Public]: "<:Discover:1026593435559407648>",
    [GuildFeature.Commerce]: "<:StoreTag:1026594093511479326>",
    [GuildFeature.News]: "<:Megaphone:1026593921670848583>",
    [GuildFeature.Discoverable]: "<:Discover:1026593435559407648>",
    [GuildFeature.Featurable]: "<:Discover:1026593435559407648>",
    [GuildFeature.AnimatedIcon]: "<:InvertedGIFLabel:1026593913248677978>",
    [GuildFeature.Banner]: "<:ImagePlaceholder:1026593909247316008>",
    [GuildFeature.PublicDisabled]: "<:Discover:1026593435559407648>",
    [GuildFeature.WelcomeScreenEnabled]: "<:ChannelCategory:1026593420791255040>",
    [GuildFeature.MemberVerificationGateEnabled]: "<:EarlyAccess:1026593392450351214>",
    [GuildFeature.EnabledDiscoverableBefore]: "<:Discover:1026593435559407648>",
    [GuildFeature.Community]: "<:Person:1026593940062871692>",
    [GuildFeature.PreviewEnabled]: "<:Discover:1026593435559407648>",
    [GuildFeature.MemberListDisabled]: "<:Person:1026593940062871692>",
    [GuildFeature.MoreEmoji]: "<:EmojiSmile:1026593400864116880>",
    [GuildFeature.RelayEnabled]: "<:Launch:1026593915572334703>",
    [GuildFeature.DiscoverableDisabled]: "<:Discover:1026593435559407648>",
    [GuildFeature.MonetizationEnabled]: "<:Ticket:1026594235333476362>",
    [GuildFeature.TicketedEventsEnabled]: "<:Ticket:1026594235333476362>",
    [GuildFeature.PrivateThreads]: "<:PrivateThreadIcon:1026594059512451225>",
    [GuildFeature.SevenDayThreadArchive]: "<:ThreadIcon:1026594234482049074>",
    [GuildFeature.ThreeDayThreadArchive]: "<:ThreadIcon:1026594234482049074>",
    [GuildFeature.ThreadsEnabled]: "<:ThreadIcon:1026594234482049074>",
    [GuildFeature.RoleIcons]: "<:StarBadge:1026594085034786826>",
    [GuildFeature.NewThreadPermissions]: "<:ThreadIcon:1026594234482049074>",
    [GuildFeature.ThreadsEnabledTesting]: "<:ThreadIcon:1026594234482049074>",
    [GuildFeature.Hub]: "<:Education:1026593393230491691>",
    [GuildFeature.AnimatedBanner]: "<:InvertedGIFLabel:1026593913248677978>",
    [GuildFeature.HasDirectoryEntry]: "<:ChannelDirectory:1026593421479116844>",
    [GuildFeature.MemberProfiles]: "<:Person:1026593940062871692>",
    [GuildFeature.AutoModeration]: "<:ChannelRules:1026593422749990912>",
    [GuildFeature.TextInVoiceEnabled]: "<:SpeakerLimited:1026594075308212325>",
    [GuildFeature.BotDeveloperEarlyAccess]: "<:RichActivity:1026594063383797872>",
    [GuildFeature.GuildHomeTest]: "<:RichActivity:1026594063383797872>",
    [GuildFeature.HadEarlyActivitiesAccess]: "<:RichActivity:1026594063383797872>",
    [GuildFeature.ExposedToActivitiesWtpExperiment]: "<:RichActivity:1026594063383797872>",
    [GuildFeature.InternalEmployeeOnly]: "<:RichActivity:1026594063383797872>",
};
exports.GuildNsfwLevelsText = {
    [constants_1.GuildNSFWLevels.AGE_RESTRICTED]: 'Age Restricted',
    [constants_1.GuildNSFWLevels.DEFAULT]: 'Default',
    [constants_1.GuildNSFWLevels.EXPLICIT]: 'Explicit',
    [constants_1.GuildNSFWLevels.SAFE]: 'Safe',
};
exports.tail = '❯';
exports.tab = '\u2003\u200b';
exports.delve = '├─';
exports.derive = '└─';
exports.bar = ' │';
exports.emojis = [];
