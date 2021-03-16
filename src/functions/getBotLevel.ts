import { GuildMember, User } from "discord.js";
import globalConf from "../globalConf";
globalConf;
export function getBotLevel(user: User | GuildMember) {
  var $level = 0;
  if (user instanceof GuildMember) {
    const perms = user.permissions.toArray();
    if (
      perms.includes("MENTION_EVERYONE") ||
      perms.includes("MANAGE_MESSAGES") ||
      perms.includes("MANAGE_NICKNAMES")
    )
      $level = 10;
    if (
      perms.includes("DEAFEN_MEMBERS") ||
      perms.includes("MOVE_MEMBERS") ||
      perms.includes("MUTE_MEMBERS")
    )
      $level = 30;
    if (
      perms.includes("MANAGE_ROLES") ||
      perms.includes("MANAGE_CHANNELS") ||
      perms.includes("MANAGE_EMOJIS") ||
      perms.includes("KICK_MEMBERS")
    )
      $level = 50;
    if (perms.includes("BAN_MEMBERS") || perms.includes("MANAGE_GUILD"))
      $level = 70;
    if (perms.includes("ADMINISTRATOR")) $level = 100;
    if (user.user.id == user.guild.ownerID) $level = 200;
    if (Object.keys(globalConf.levels).includes(user.user.id))
      $level = globalConf.levels[user.user.id] as number;
  } else if (Object.keys(globalConf.levels).includes(user.id))
    $level = globalConf.levels[user.id] as number;
  return $level;
}
