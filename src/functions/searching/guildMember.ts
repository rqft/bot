import { Guild } from "discord.js";

export async function search_guildMember(query: string, guild: Guild) {
  return (await guild.members.fetch()).find((member) => {
    return (
      member.user.username.toLowerCase().includes(query) ||
      member.user.tag.toLowerCase().includes(query) ||
      (!!member.nickname && member.nickname.includes(query)) ||
      query.replace(/\D/g, "") == member.id
    );
  });
}
