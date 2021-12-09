import { Context } from "detritus-client/lib/command";
import fetch from "node-fetch";
import { altclients, client, Regex, selfclient } from "../globals";
import { findImage } from "./findImage";
const all = [client, ...altclients, selfclient]
  .map((v) => v.users.toArray())
  .flat(1);
export namespace Parameters {
  export function user(value: string, _context: Context) {
    const found = all.find((key) => {
      return (
        key.username.toLowerCase().includes(value) ||
        key.toString().toLowerCase() === value ||
        key.id === value.replace(/\D/g, "")
      );
    });
    return found;
  }
  export function imageUrl(value: string, context: Context) {
    return findImage(context, value);
  }
  export async function image(value: string, context: Context) {
    let url = await imageUrl(value, context);
    if (!url) throw new Error("Could not find any images");

    const imageResponse = await fetch(url);
    if (!imageResponse.ok)
      throw new Error(
        `Error ${imageResponse.status}: ${imageResponse.statusText}`
      );

    return imageResponse.buffer();
  }

  export function emojiImage(query: string) {
    query = query.toLowerCase();
    if (![Regex.EMOJI, Regex.UNICODE_EMOJI].some((v) => v.test(query)))
      return undefined;
    var url, type: "twemoji" | "custom", id;
    if (!query!.replace(/\D/g, "")) {
      const hex = query!.codePointAt(0)!.toString(16);
      const result = "0000".substring(0, 4 - hex.length) + hex;
      url = `https://cdn.notsobot.com/twemoji/512x512/${result}.png`;
      type = "twemoji";
    } else {
      url = `https://cdn.discordapp.com/emojis/${query?.replace(/\D/g, "")}.${
        query?.startsWith("<a:") ? "gif" : "png"
      }`;
      type = "custom";
      id = query?.replace(/\D/g, "");
    }
    return {
      url,
      type,
      id,
    };
  }
  export function guildEmoji(emoj: string) {
    emoj = emoj.toLowerCase();
    return client.emojis.find(
      (v) =>
        v.name.toLowerCase().includes(emoj) ||
        v.id === emoj.replace(/\D/g, "") ||
        v.url.toLowerCase() === emoj
    );
  }
}
export namespace DefaultParameters {
  export function user(context: Context) {
    return context.user;
  }
}
