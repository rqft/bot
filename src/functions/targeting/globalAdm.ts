import { GuildMember, User } from "discord.js";
import globalConf from "../../globalConf";

export function compareGA(user: GuildMember, target: GuildMember | User) {
  if (user.guild.ownerID == user.id && globalConf.ownerIDs.includes(user.id))
    return true;
  if (globalConf.ownerIDs.includes(target.id)) return false;
  return true;
}
