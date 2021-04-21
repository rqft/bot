import * as Structures from "detritus-client/lib/structures";
import { Guild, GuildPreview } from "discord.js";
import { client } from "../..";
/**
 * Searches for a guild
 * @param {string} query
 */
export async function search_guild(
  query: string
): Promise<Guild | GuildPreview | undefined> {
  var found:
    | Guild
    | GuildPreview
    | undefined
    | Structures.Guild = client.guilds.cache.find((guild) => {
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
  if (!found)
    try {
      found = (await client.fetchGuildPreview(query)) ?? undefined;
    } catch {
      found = undefined;
    }
  return found;
}
