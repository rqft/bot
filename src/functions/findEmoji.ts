import { client } from "..";
import { Regex } from "../globals";

export function findEmoji(emoj: string) {
  emoj = emoj.toLowerCase();
  if (![Regex.EMOJI, Regex.UNICODE_EMOJI].some((v) => v.test(emoj)))
    return undefined;
  var url, type: "twemoji" | "custom", id;
  if (!emoj!.replace(/\D/g, "")) {
    const hex = emoj!.codePointAt(0)!.toString(16);
    const result = "0000".substring(0, 4 - hex.length) + hex;
    url = `https://cdn.notsobot.com/twemoji/512x512/${result}.png`;
    type = "twemoji";
  } else {
    url = `https://cdn.discordapp.com/emojis/${emoj?.replace(/\D/g, "")}.${
      emoj?.startsWith("<a:") ? "gif" : "png"
    }`;
    type = "custom";
    id = emoj?.replace(/\D/g, "");
  }
  return {
    url,
    type,
    id,
  };
}
export function findGuildEmoji(emoj: string) {
  emoj = emoj.toLowerCase();
  return client.emojis.find(
    (v) =>
      v.name.toLowerCase().includes(emoj) ||
      v.id === emoj.replace(/\D/g, "") ||
      v.url.toLowerCase() === emoj
  );
}
