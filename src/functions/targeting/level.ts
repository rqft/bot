import { GuildMember, User } from "discord.js";
import { getBotLevel } from "../getBotLevel";

export function compareLevel(
  user: GuildMember,
  target: User | GuildMember | number
) {
  if (target instanceof GuildMember || target instanceof User)
    target = getBotLevel(target);
  return getBotLevel(user) > target;
}
