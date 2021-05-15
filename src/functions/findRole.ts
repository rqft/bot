import { Guild } from "detritus-client/lib/structures";
import { getCollectiveRoles } from "./getters";

export function findRole(query: string, guild: Guild, global: boolean = false) {
  query = query.toLowerCase();
  var found = guild.roles.find(
    (e) =>
      e.name.toLowerCase().includes(query) ||
      e.toString().toLowerCase() === query ||
      e.id === query.replace(/\D/g, "") ||
      (query === "booster" && e.isBoosterRole)
  );
  if (!found)
    if (global)
      found = getCollectiveRoles().find(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.toString().toLowerCase() === query ||
          e.id === query.replace(/\D/g, "")
      );
  return found;
}
