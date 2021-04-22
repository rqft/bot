import fetch from "node-fetch";
import { findUser } from "./findUser";

export async function getImageUrl(
  query: string,
  format: "gif" | "jpeg" | "jpg" | "png" | "webp" = "png"
) {
  var url = null;
  const user = await findUser(query);
  if (user) url = user.avatarUrl;
  else if (/<a?:.+:\d+>/gi.test(query))
    url = `https://cdn.discordapp.com/emojis/${query?.replace(/\D/g, "")}.${
      query?.startsWith("<a:") && format !== "png" ? format : "png"
    }`;
  if (!url) return (url = query);
  if ((await fetch(url)).ok) return url;
  return undefined;
}
