import { Guild } from "discord.js";

export async function search_channel(
  query: string,
  queryType: keyof typeof ChannelType = "text",
  guild: Guild
) {
  return guild.channels.cache.find((member) => {
    return (
      member.name.toLowerCase().includes(query) ||
      member.type == queryType ||
      query.replace(/\D/g, "") == member.id
    );
  });
}
