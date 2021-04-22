import { Member, Role } from "detritus-client/lib/structures";
import { PermissionString, PermissionStringUnion } from "../enums/utils";
import globalConf from "../globalConf";
import { bitfieldToArray } from "./bitfieldToArray";
const ignoredPermissions: PermissionStringUnion[] = [
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
export function getUserPermissions(user: Member | Role) {
  var perms: (
    | PermissionStringUnion
    | CustomPermissionString
  )[] = bitfieldToArray(user.permissions, PermissionString).filter(
    (e) => !ignoredPermissions.includes(e)
  );

  if (perms.includes("ADMINISTRATOR")) perms = ["ADMINISTRATOR"];
  if (user.id == user.guild!.owner!.id) perms = ["SERVER_OWNER"];
  if (globalConf.ownerIDs.includes(user.id)) perms.unshift("GLOBAL_ADMIN");
  if ("760143615124439040" == user.id) perms.unshift("SYSTEM");

  if (perms.length == 0) {
    perms = ["NONE"];
  }
  if (user instanceof Role && user.managed) perms.unshift("MANAGED");
  return perms;
}
