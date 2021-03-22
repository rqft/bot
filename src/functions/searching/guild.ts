import { client } from "../..";
/**
 * Searches for a guild
 * @param {string} query
 */
export async function search_guild(query: string) {
  return client.guilds.cache.find((guild) => {
    return (
      guild.name.toLowerCase().includes(query) ||
      query.replace(/\D/g, "") == guild.id
    );
  });
}
