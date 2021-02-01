import { client } from "../index";
import { config } from "./config";
import { logBlacklistedGuild } from "./logBlacklistedGuild";
import { logBlacklistedGuildOwner } from "./logBlacklistedGuildOwner";

export function leaveBlacklistedGuilds() {
  config.blacklist.guild.ids.forEach((e) => {
    const g = client.guilds.cache.get(e);
    if (g?.me) {
      g?.leave();
      logBlacklistedGuild(g);
    }
  });
  config.blacklist.guild.owners.forEach((e) => {
    const g = client.guilds.cache.array().filter((guild) => guild.ownerID == e);
    g.forEach((h) => {
      if (h?.me) {
        h?.leave();
        logBlacklistedGuildOwner(h, h.owner!.user);
      }
    });
  });
}
