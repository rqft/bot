import { Member, User } from "detritus-client/lib/structures";
import { PermissionString } from "../enums/utils";
import globalConf from "../globalConf";
import { bitfieldToArray } from "./bitfieldToArray";

export function getBotLevel(user: User | Member) {
  var $level = {
    level: 0,
    type: "User",
  };
  if (user instanceof Member) {
    const perms = bitfieldToArray(user.permissions, PermissionString);
    if (
      perms.includes("MENTION_EVERYONE") ||
      perms.includes("MANAGE_MESSAGES") ||
      perms.includes("MANAGE_EMOJIS")
    )
      $level = {
        level: 10,
        type: "Trusted",
      };
    if (
      perms.includes("MANAGE_CHANNELS") ||
      perms.includes("CHANGE_NICKNAMES") ||
      perms.includes("DEAFEN_MEMBERS") ||
      perms.includes("MOVE_MEMBERS") ||
      perms.includes("MUTE_MEMBERS")
    )
      $level = {
        level: 30,
        type: "Helper",
      };
    if (perms.includes("KICK_MEMBERS"))
      $level = {
        level: 50,
        type: "Elevated",
      };
    if (
      perms.includes("BAN_MEMBERS") ||
      perms.includes("MANAGE_GUILD") ||
      perms.includes("MANAGE_ROLES")
    )
      $level = {
        level: 70,
        type: "Moderator",
      };
    if (perms.includes("ADMINISTRATOR"))
      $level = {
        level: 100,
        type: "Admin",
      };
    if (user.user.id == user.guild!.ownerId)
      $level = {
        level: 200,
        type: "Server Owner",
      };
    if (globalConf.levels[user.user.id])
      $level = {
        level: globalConf.levels[user.user.id]!,
        type: "Custom",
      };
  } else if (globalConf.levels[user.id])
    $level = {
      level: globalConf.levels[user.id]!,
      type: "Custom",
    };
  return $level;
}
