import { client } from "../..";
import { SpecialIDs } from "../../globals";

export async function search_user(query: string) {
  if (query.toLowerCase() == "discord") query = SpecialIDs.DISCORD;
  if (query.toLowerCase() == "updated") query = SpecialIDs.DISCORD;
  var user = client.users.cache.find((user) => {
    return (
      user.username.toLowerCase().includes(query) ||
      user.tag.toLowerCase().includes(query) ||
      query.replace(/\D/g, "") == user.id
    );
  });
  try {
    user = await client.users.fetch(query.replace(/\D/g, ""));
  } catch {}
  return user;
}
