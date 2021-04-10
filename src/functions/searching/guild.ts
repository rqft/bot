import { client } from "../..";
/**
 * Searches for a guild
 * @param {string} query
 */
export async function search_guild(query: string) {
  var found = client.guilds.cache.find((guild) => {
    return (
      guild.name.toLowerCase().includes(query) ||
      query.replace(/\D/g, "") == guild.id
    );
  });
  if (!found)
    try {
      found = (await client.fetchInvite(query)).guild ?? undefined;
    } catch {
      found = undefined;
    }

  return found;
}
