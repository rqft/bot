import { Guild } from "discord.js";

export async function search_channel(query: string, guild: Guild) {
  return guild.channels.cache.find((member) => {
    return (
      member.name.toLowerCase().includes(query) ||
      query.replace(/\D/g, "") == member.id
    );
  });
}
