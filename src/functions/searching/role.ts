import { Guild } from "discord.js";

export async function search_role(query: string, guild: Guild) {
  return guild.roles.cache.find(
    (member) =>
      member.name.toLowerCase().includes(query) ||
      member.position.toString() == query.replace(/\D/g, "") ||
      query.replace(/\D/g, "") == member.id
  );
}
