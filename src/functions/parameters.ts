import { Command, Context } from "detritus-client/lib/command";
import fetch from "node-fetch";
import { altclients, client, Regex, selfclient } from "../globals";
import { findImage } from "./findImage";

export namespace Parameters {
  export function command(content: string, context: Context) {
    if (content) {
      const commands: Array<Command> = [];
      const commandsWithPrefix: Array<Command> = [];

      const insensitive = content.toLowerCase().replace(/\s\s+/g, " ");
      const insensitiveAsPrefix = insensitive + " ";

      for (let command of context.commandClient.commands) {
        if (command.names.includes(insensitive)) {
          commandsWithPrefix.push(command);
          continue;
        }
        if (
          command.names.some((name) => name.startsWith(insensitiveAsPrefix))
        ) {
          commandsWithPrefix.push(command);
          continue;
        }
        if (command.names.some((name) => name.startsWith(insensitive))) {
          commands.push(command);
          continue;
        }
      }
      return [
        ...commandsWithPrefix.sort((x, y) => {
          if (x.names.includes(insensitive)) {
            return -1;
          }
          return x.name.localeCompare(y.name);
        }),
        ...commands.sort((x, y) => x.name.localeCompare(y.name)),
      ];
    }
    return null;
  }

  export function user(value: string, _context: Context) {
    const found = [client, ...altclients, selfclient]
      .map((v) => v.users.toArray())
      .flat(1)
      .find((key) => {
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
  export function color(value: string) {
    let hex = value.replace(/\D/g, "");
    if (![3, 6].some((v) => v === hex.length)) throw new Error("Invalid color");
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((v) => v + v)
        .join("");
    return hex;
  }
  export function url(value: string) {
    let url: URL;
    try {
      url = new URL(value);
    } catch {
      return undefined;
    }
    return url;
  }
  export function date(value: string, _context: Context) {
    const date = new Date(value);
    if (isNaN(date.getTime())) throw new Error("Invalid date");
    return date;
  }
  export function phone(value: string, _context: Context) {
    // phone number regex
    const regex =
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!value.match(regex)) throw new Error("Invalid phone number");
    return value;
  }
}
export namespace DefaultParameters {
  export function user(context: Context) {
    return context.user;
  }
}
