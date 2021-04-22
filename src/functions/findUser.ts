import { client, selfclient } from "..";

export function findUser(query: string) {
  return (
    client.users
      .toArray()
      .find(
        (e) =>
          e.username.toLowerCase().includes(query) ||
          (e.username + "#" + e.toString()).toLowerCase().includes(query) ||
          e.id === query.replace(/\D/g, "")
      ) ??
    selfclient.users.find(
      (e) =>
        e.username.toLowerCase().includes(query) ||
        (e.username + "#" + e.toString()).toLowerCase().includes(query) ||
        e.id === query.replace(/\D/g, "")
    )
  );
}
