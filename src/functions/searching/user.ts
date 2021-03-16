import { client } from "../..";

export async function search_user(query: string) {
  return (
    client.users.cache.find((user) => {
      return (
        user.username.toLowerCase().startsWith(query) ||
        user.tag.toLowerCase().startsWith(query) ||
        query.replace(/\D/g, "") == user.id
      );
    }) ?? (await client.users.fetch(query.replace(/\D/g, "")))
  );
}
