import { GuildMember } from "discord.js";
import { messages } from "../../messages";
import { getBotLevel } from "../getBotLevel";
import { replacer } from "../replacer";
import { compareGA } from "./globalAdm";
import { compareLevel } from "./level";
import { compareRoles } from "./roles";

export function checkTargets(user: GuildMember, target: GuildMember) {
  const data = {
    messages: [] as string[],
    checks: {
      roles: true,
      globalAdm: true,
      level: true,
    },
  };
  if (user.guild.ownerID == user.id || user.id == target.id) return data;
  if (!compareRoles(user, target)) data.checks.roles = false;
  if (!compareGA(user, target)) data.checks.globalAdm = false;
  if (!compareLevel(user, target)) data.checks.level = false;
  if (!data.checks.roles)
    data.messages.push(messages.targeting.actor_cant_hierarchy);
  if (!data.checks.globalAdm)
    data.messages.push(messages.targeting.actor_cant_admin);
  const map = new Map([["{LEVEL}", getBotLevel(target).level]]);
  const rep = replacer(messages.targeting.actor_cant_level, map);
  if (!data.checks.level) data.messages.push(rep);
  return data;
}
