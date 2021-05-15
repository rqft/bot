import { User } from "detritus-client/lib/structures";
import { client } from "..";

export function genToken(user: User | string) {
  const token = [];
  if (typeof user === "string") user = client.users.get(user)!;
  const date = Math.round(new Date().getTime() / 1000 - 1293840000).toString();
  token.push(Buffer.from(user.id).toString("base64"));
  token.push(Buffer.from(date).toString("base64"));
  return token.join(".");
}
