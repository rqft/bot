import { getCollectiveGuilds } from "./getters";
export function findGuild(query: string) {
  query = query.toLowerCase();
  return getCollectiveGuilds().find(
    (e) =>
      e.name.toLowerCase().includes(query) ||
      e.jumpLink === query ||
      e.id === query.replace(/\D/g, "") ||
      (e.vanityUrlCode && e.vanityUrlCode === query)
  );
}
