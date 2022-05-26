"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceRegionsText = exports.GuildVoiceRegion = exports.StagePrivacyLevelsText = exports.VideoQualityModesText = exports.BooleanText = exports.ChannelTypesText = exports.UserBadges = exports.IrrelevantPermissions = exports.BrandIcons = exports.BrandColours = exports.BrandNames = exports.Brand = exports.Colours = exports.TRUSTED_URLS = exports.UNICODE_EMOJI_REGEX = exports.VALID_URL_REGEX = exports.PermissionsText = void 0;
const constants_1 = require("detritus-client/lib/constants");
const emojis_1 = require("./tools/emojis");
exports.PermissionsText = Object.freeze({
    [String(constants_1.Permissions.NONE)]: "None",
    [String(constants_1.Permissions.ADD_REACTIONS)]: "Add Reactions",
    [String(constants_1.Permissions.ADMINISTRATOR)]: "Administrator",
    [String(constants_1.Permissions.ATTACH_FILES)]: "Attach Files",
    [String(constants_1.Permissions.BAN_MEMBERS)]: "Ban Members",
    [String(constants_1.Permissions.CHANGE_NICKNAME)]: "Change Nickname",
    [String(constants_1.Permissions.CHANGE_NICKNAMES)]: "Change Nicknames",
    [String(constants_1.Permissions.CONNECT)]: "Connect",
    [String(constants_1.Permissions.CREATE_INSTANT_INVITE)]: "Create Instant Invite",
    [String(constants_1.Permissions.DEAFEN_MEMBERS)]: "Deafen Members",
    [String(constants_1.Permissions.EMBED_LINKS)]: "Embed Links",
    [String(constants_1.Permissions.KICK_MEMBERS)]: "Kick Members",
    [String(constants_1.Permissions.MANAGE_CHANNELS)]: "Manage Channels",
    [String(constants_1.Permissions.MANAGE_EMOJIS)]: "Manage Emojis",
    [String(constants_1.Permissions.MANAGE_GUILD)]: "Manage Guild",
    [String(constants_1.Permissions.MANAGE_MESSAGES)]: "Manage Messages",
    [String(constants_1.Permissions.MANAGE_ROLES)]: "Manage Roles",
    [String(constants_1.Permissions.MANAGE_THREADS)]: "Manage Threads",
    [String(constants_1.Permissions.MANAGE_WEBHOOKS)]: "Manage Webhooks",
    [String(constants_1.Permissions.MENTION_EVERYONE)]: "Mention Everyone",
    [String(constants_1.Permissions.MOVE_MEMBERS)]: "Move Members",
    [String(constants_1.Permissions.MUTE_MEMBERS)]: "Mute Members",
    [String(constants_1.Permissions.NONE)]: "None",
    [String(constants_1.Permissions.PRIORITY_SPEAKER)]: "Priority Speaker",
    [String(constants_1.Permissions.READ_MESSAGE_HISTORY)]: "Read Message History",
    [String(constants_1.Permissions.REQUEST_TO_SPEAK)]: "Request To Speak",
    [String(constants_1.Permissions.SEND_MESSAGES)]: "Send Messages",
    [String(constants_1.Permissions.SEND_TTS_MESSAGES)]: "Text-To-Speech",
    [String(constants_1.Permissions.SPEAK)]: "Speak",
    [String(constants_1.Permissions.STREAM)]: "Go Live",
    [String(constants_1.Permissions.USE_APPLICATION_COMMANDS)]: "Use Application Commands",
    [String(constants_1.Permissions.USE_EXTERNAL_EMOJIS)]: "Use External Emojis",
    [String(constants_1.Permissions.USE_PRIVATE_THREADS)]: "Use Private Threads",
    [String(constants_1.Permissions.USE_PUBLIC_THREADS)]: "Use Public Threads",
    [String(constants_1.Permissions.USE_VAD)]: "Voice Auto Detect",
    [String(constants_1.Permissions.VIEW_AUDIT_LOG)]: "View Audit Logs",
    [String(constants_1.Permissions.VIEW_CHANNEL)]: "View Channel",
    [String(constants_1.Permissions.VIEW_GUILD_ANALYTICS)]: "View Guild Analytics",
});
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
    [Brand.PXL]: "PXL API"
};
exports.BrandColours = {
    [Brand.VYBOSE]: Colours.PURPLE,
    [Brand.IMAGGA]: Colours.AQUA,
    [Brand.PXL]: Colours.WHITE
};
exports.BrandIcons = {
    [Brand.VYBOSE]: new URL("https://rqft.space/i/image/vybost.png"),
    [Brand.IMAGGA]: new URL("https://www.programmableweb.com/sites/default/files/imagga_logo_small_500x288px.png"),
    [Brand.PXL]: new URL("https://pxlapi.dev/images/logo-small-transparent.png")
};
exports.IrrelevantPermissions = [
    constants_1.Permissions.NONE,
    constants_1.Permissions.CREATE_INSTANT_INVITE,
    constants_1.Permissions.ADD_REACTIONS,
    constants_1.Permissions.STREAM,
    constants_1.Permissions.VIEW_CHANNEL,
    constants_1.Permissions.SEND_MESSAGES,
    constants_1.Permissions.SEND_TTS_MESSAGES,
    constants_1.Permissions.EMBED_LINKS,
    constants_1.Permissions.ATTACH_FILES,
    constants_1.Permissions.READ_MESSAGE_HISTORY,
    constants_1.Permissions.USE_EXTERNAL_EMOJIS,
    constants_1.Permissions.CONNECT,
    constants_1.Permissions.SPEAK,
    constants_1.Permissions.USE_VAD,
    constants_1.Permissions.CHANGE_NICKNAME,
    constants_1.Permissions.VIEW_GUILD_ANALYTICS,
    constants_1.Permissions.VIEW_AUDIT_LOG,
    constants_1.Permissions.PRIORITY_SPEAKER,
    constants_1.Permissions.USE_APPLICATION_COMMANDS,
    constants_1.Permissions.REQUEST_TO_SPEAK,
    constants_1.Permissions.USE_PUBLIC_THREADS,
    constants_1.Permissions.USE_PRIVATE_THREADS,
];
exports.UserBadges = {
    [constants_1.UserFlags.BUG_HUNTER_LEVEL_1]: "<:IconBadge_BugHunter:798624232338227261>",
    [constants_1.UserFlags.BUG_HUNTER_LEVEL_2]: "<:IconBadge_BugHunterGold:799290353357684797>",
    [constants_1.UserFlags.DISCORD_CERTIFIED_MODERATOR]: "<:IconBadge_CertifiedModerator:889779348943536148>",
    [constants_1.UserFlags.HAS_UNREAD_URGENT_MESSAGES]: emojis_1.Emojis.WARNING,
    [constants_1.UserFlags.HYPESQUAD]: "<:IconBadge_HypeSquadEvents:798624232694087682>",
    [constants_1.UserFlags.HYPESQUAD_ONLINE_HOUSE_1]: "<:IconBadge_HypeSquadBrilliance:798624232552529920>",
    [constants_1.UserFlags.HYPESQUAD_ONLINE_HOUSE_2]: "<:IconBadge_HypeSquadBravery:798624232425652244>",
    [constants_1.UserFlags.HYPESQUAD_ONLINE_HOUSE_3]: "<:IconBadge_HypeSquadBalance:798624232409661451>",
    [constants_1.UserFlags.MFA_SMS]: "<:IconStatus_Mobile:798624245201764462>",
    [constants_1.UserFlags.PARTNER]: "<:IconBadge_Partner:798624238939406416>",
    [constants_1.UserFlags.PREMIUM_EARLY_SUPPORTER]: "<:IconBadge_EarlySupporter:798624232471920680>",
    [constants_1.UserFlags.PREMIUM_PROMO_DISMISSED]: emojis_1.Emojis.TRIANGULAR_FLAG_ON_POST,
    [constants_1.UserFlags.STAFF]: "<:IconBadge_Staff:798624241595318272>",
    [constants_1.UserFlags.SYSTEM]: emojis_1.Emojis.GEAR,
    [constants_1.UserFlags.TEAM_USER]: emojis_1.Emojis.GEAR,
    [constants_1.UserFlags.VERIFIED_BOT]: "<:IconBadge_VerifiedBot:798624262533283865>",
    [constants_1.UserFlags.VERIFIED_DEVELOPER]: "<:IconBadge_BotDeveloper:798624232443478037>",
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
};
