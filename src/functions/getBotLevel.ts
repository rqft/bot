import { GuildMember } from "discord.js";
import { config } from "../config";

export function getBotLevel(user: GuildMember) {
  var $level = 0;
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
  if (user == user.guild.owner) $level = 200;
  if (config.blacklist.users.includes(user.id)) $level = -1;
  if (config.blacklist.guild.owners.includes(user.id)) $level = -2;
  if (user.id == config.bot.id) $level = 777;
  if (config.bot.ownerIds.includes(user.id)) $level = 888;
  return $level;
}
