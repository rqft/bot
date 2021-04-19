import { AllowedImageFormat } from "discord.js";
import fetch from "node-fetch";
import { search_user } from "./searching/user";

export async function getImageUrl(
  query: string,
  format: AllowedImageFormat = "png"
) {
  var url = null;
  const user = await search_user(query);
  if (user) url = user.avatarURL({ format, size: 4096 });
  else if (/<a?:.+:\d+>/gi.test(query))
    url = `https://cdn.discordapp.com/emojis/${query?.replace(/\D/g, "")}.${
      query?.startsWith("<a:") && format !== "png" ? format : "png"
    }`;
  if (!url) return (url = query);
  if ((await fetch(url)).ok) return url;
  return undefined;
}
