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
  const ga = compareGA(user, target);
  const rs = compareRoles(user, target);
  const lv = compareLevel(user, target);
  if (!ga) {
    data.checks.globalAdm = false;
    data.messages.push(messages.targeting.actor_cant_admin);
  }
  if (!lv) {
    data.checks.level = false;
    data.messages.push(
      replacer(
        messages.targeting.actor_cant_level,
        new Map([["{LEVEL}", getBotLevel(target)]])
      )
    );
  }
  if (!rs) {
    data.checks.roles = false;
    data.messages.push(messages.targeting.actor_cant_hierarchy);
  }
  return data;
}
