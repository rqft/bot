"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPermissions = void 0;
const config_1 = require("../config");
const capitalizeWords_1 = require("./capitalizeWords");
const ignoredPermissions = [
    "ADD_REACTIONS",
    "ATTACH_FILES",
    "CHANGE_NICKNAME",
    "CONNECT",
    "CREATE_INSTANT_INVITE",
    "EMBED_LINKS",
    "MENTION_EVERYONE",
    "READ_MESSAGE_HISTORY",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "SPEAK",
    "STREAM",
    "USE_EXTERNAL_EMOJIS",
    "USE_VAD",
    "VIEW_CHANNEL",
];
function getUserPermissions(user) {
    var perms = user.permissions
        .toArray()
        .filter((e) => !ignoredPermissions.includes(e));
    if (perms.length == 0) {
        perms = ["NONE"];
    }
    if (perms.includes("ADMINISTRATOR"))
        perms = ["ADMINISTRATOR"];
    if (user == user.guild.owner)
        perms = ["SERVER_OWNER"];
    if (config_1.config.blacklist.guild.owners.includes(user.id))
        perms.unshift("BLACKLISTED_GUILD_OWNER");
    if (config_1.config.blacklist.users.includes(user.id))
        perms.unshift("BLACKLISTED_USER");
    if (config_1.config.bot.ownerIds.includes(user.id))
        perms.unshift("BOT_OWNER");
    if (config_1.config.bot.id == user.id)
        perms.unshift("SYSTEM");
    return perms
        .map((e) => `\`${capitalizeWords_1.capitalizeWords(e.toLowerCase().replace(/_/g, " "))}\``)
        .join(", ");
}
exports.getUserPermissions = getUserPermissions;
