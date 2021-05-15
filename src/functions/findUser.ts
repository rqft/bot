import { User } from "detritus-client/lib/structures";
import { client } from "..";
import { restClient } from "../globals";
import { getCollectiveUsers } from "./getters";
export async function findUser(query: string): Promise<User> {
  query = query.toLowerCase();
  return (
    getCollectiveUsers().find(
      (e) =>
        e.username.toLowerCase().includes(query) ||
        e.toString().toLowerCase() === query ||
        e.id === query.replace(/\D/g, "")
    ) ?? new User(client, await restClient.fetchUser(query))
  );
}
