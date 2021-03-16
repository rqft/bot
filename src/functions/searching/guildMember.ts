import { Guild } from "discord.js";

export async function search_guildMember(query: string, guild: Guild) {
  return (await guild.members.fetch()).find((member) => {
    return (
      member.user.username.toLowerCase().startsWith(query) ||
      member.user.tag.toLowerCase().startsWith(query) ||
      (!!member.nickname && member.nickname.startsWith(query)) ||
      query.replace(/\D/g, "") == member.id
    );
  });
}
