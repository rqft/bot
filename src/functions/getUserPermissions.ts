import { GuildMember, PermissionString, Role } from "discord.js";
import globalConf from "../globalConf";
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
  if (globalConf.ownerIDs.includes(user.id)) perms.unshift("GLOBAL_ADMIN");
  if ("760143615124439040" == user.id) perms.unshift("SYSTEM");

  if (perms.length == 0) {
    perms = ["NONE"];
  }
  if (user instanceof Role && user.managed) perms.unshift("MANAGED");
  return perms;
}
