import { GuildMember } from "discord.js";

export function compareRoles(user: GuildMember, target: GuildMember) {
  return user.roles.highest.position > target.roles.highest.position;
}
