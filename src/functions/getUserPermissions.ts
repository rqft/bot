import { GuildMember, PermissionString, Role } from "discord.js";
import { config } from "../config";
import { capitalizeWords } from "./capitalizeWords";
const ignoredPermissions: PermissionString[] = [
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
type CustomPermissionString =
  | "MANAGED"
  | "SERVER_OWNER"
  | "BLACKLISTED_USER"
  | "BLACKLISTED_GUILD_OWNER"
  | "GLOBAL_ADMIN"
  | "SYSTEM"
  | "NONE";
export function getUserPermissions(user: GuildMember | Role) {
  var perms: (
    | PermissionString
    | CustomPermissionString
  )[] = user.permissions
    .toArray()
    .filter((e) => !ignoredPermissions.includes(e));

  if (perms.includes("ADMINISTRATOR")) perms = ["ADMINISTRATOR"];
  if (user == user.guild.owner) perms = ["SERVER_OWNER"];
  if (config.blacklist.guild.owners.includes(user.id))
    perms.unshift("BLACKLISTED_GUILD_OWNER");
  if (config.blacklist.users.includes(user.id))
    perms.unshift("BLACKLISTED_USER");
  if (config.bot.ownerIds.includes(user.id)) perms.unshift("GLOBAL_ADMIN");
  if (config.bot.id == user.id) perms.unshift("SYSTEM");

  if (perms.length == 0) {
    perms = ["NONE"];
  }
  if (user instanceof Role && user.managed) perms.unshift("MANAGED");
  return perms
    .map((e) => `\`${capitalizeWords(e.toLowerCase().replace(/_/g, " "))}\``)
    .join(", ");
}
