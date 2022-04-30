import { Command, Context } from "detritus-client/lib/command";
import { DiscordRegexNames } from "detritus-client/lib/constants";
import {
  InteractionAutoCompleteContext,
  InteractionContext,
} from "detritus-client/lib/interaction";
import { regex } from "detritus-client/lib/utils";
import { decode, Frame, GIF, Image } from "imagescript";
import Jimp from "jimp";
import fetch from "node-fetch";
import {
  altclients,
  client,
  commands as cmd,
  Regex,
  selfclient,
} from "../globals";
import { Err } from "./error";
import { findImage } from "./findImage";

export namespace Parameters {
  export function command(content: string) {
    if (content) {
      const commands: Array<Command> = [];
      const commandsWithPrefix: Array<Command> = [];

      const insensitive = content.toLowerCase().replace(/\s\s+/g, " ");
      const insensitiveAsPrefix = insensitive + " ";

      for (let command of cmd.commands) {
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
  export function codeblock(value: string): {
    language?: string;
    text: string;
  } {
    const { matches } = regex(DiscordRegexNames.TEXT_CODEBLOCK, value) as {
      matches: Array<{ language?: string; text: string }>;
    };
    if (matches.length && matches[0]) {
      return matches[0];
    }
    return { text: value };
  }
  export interface StringOptions {
    minimumLength?: number;
    maximumLength?: number;
  }
  export function string(options: StringOptions = {}) {
    return (value: string): string => {
      if (
        options.maximumLength !== undefined &&
        options.minimumLength !== undefined
      ) {
        if (
          value.length < options.minimumLength ||
          options.maximumLength < value.length
        ) {
          throw new Err(
            `Value must be between ${options.minimumLength} and ${options.maximumLength} characters`
          );
        }
      } else if (options.maximumLength !== undefined) {
        if (options.maximumLength < value.length) {
          throw new Err(
            `Value must be less than ${options.maximumLength} characters`
          );
        }
      } else if (options.minimumLength !== undefined) {
        if (value.length < options.minimumLength) {
          throw new Err(
            `Value must be more than ${options.minimumLength} characters`
          );
        }
      }
      return value;
    };
  }
  export interface ListOptions<T> {
    minimumLength?: number;
    maximumLength?: number;
    delimiter?: string;
    transform?: (value: string) => T;
  }
  export function list<T>(options: ListOptions<T> = {}) {
    return (value: string): Array<T> => {
      const values: Array<any> = value.split(options.delimiter || " ");
      if (
        options.maximumLength !== undefined &&
        values.length > options.maximumLength
      ) {
        throw new Err(
          `Value must be less than ${options.maximumLength} values`
        );
      }
      if (
        options.minimumLength !== undefined &&
        values.length < options.minimumLength
      ) {
        throw new Err(
          `Value must be more than ${options.minimumLength} values`
        );
      }
      if (options.transform) {
        for (let value of values) {
          value = options.transform(value);
        }
      }
      return values;
    };
  }
  export interface NumberOptions {
    minimum?: number;
    maximum?: number;
    integer?: boolean;
  }
  export function number(options: NumberOptions = {}) {
    return (value: string): number => {
      const number = Number(value);
      if (isNaN(number)) {
        throw new Err("Value must be a number");
      }
      if (options.integer) {
        if (number !== Math.floor(number)) {
          throw new Err("Value must be an integer");
        }
      }
      if (options.minimum !== undefined && number < options.minimum) {
        throw new Err(`Value must be more than ${options.minimum}`);
      }
      if (options.maximum !== undefined && number > options.maximum) {
        throw new Err(`Value must be less than ${options.maximum}`);
      }
      return number;
    };
  }

  export async function user(
    value: string,
    _context: Context | InteractionContext
  ) {
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
    if (!found) {
      try {
        const fetchy = await client.rest.fetchUser(value.replace(/\D/g, ""));
        if (fetchy) {
          return fetchy;
        }
      } catch (e) {}
    }
    return found;
  }
  export async function channel(value: string, _context: Context) {
    const found = [client, ...altclients, selfclient]
      .map((v) => v.channels.toArray())
      .flat(1)
      .find((key) => {
        return (
          key.name.toLowerCase().includes(value) ||
          key.toString().toLowerCase() === value ||
          key.id === value.replace(/\D/g, "")
        );
      });
    if (!found) {
      try {
        const fetchy = await client.rest.fetchChannel(value.replace(/\D/g, ""));
        if (fetchy) {
          return fetchy;
        }
      } catch (e) {}
    }
    return found;
  }
  export function imageUrl(as?: string) {
    return async (value: string, context: Context | InteractionContext) => {
      const img = await findImage(context, value, as);

      return img;
    };
  }
  export function image(as?: string) {
    return async (value: string, context: Context) => {
      let url = await imageUrl(as)(value, context);
      console.log(url);
      if (!url) throw new Err("Could not find any images");

      const imageResponse = await fetch(url);
      if (!imageResponse.ok)
        throw new Err(
          `Error ${imageResponse.status}: ${imageResponse.statusText}`
        );

      return imageResponse.buffer();
    };
  }
  export namespace PJimp {
    export async function jimp(value: string, context: Context) {
      const img = await image()(value, context);
      return new Jimp(img);
    }
  }
  export namespace ImageScript {
    export async function animation(
      value: string,
      context: Context
    ): Promise<GIF> {
      const img = await image()(value, context);
      console.log(img);
      let gif = await decode(img);
      if (gif instanceof Image) {
        gif = new GIF([Frame.from(gif)]);
      }
      return gif;
    }

    export async function frame(
      value: string,
      context: Context
    ): Promise<Image> {
      const img = await image()(value, context);
      const gif = await decode(img);
      let payload;
      if (gif instanceof Image) {
        payload = gif;
      } else {
        payload = gif[0]!;
      }

      // if (payload.width > 256 || payload.height > 256) {
      //   payload.resize(256, Image.RESIZE_AUTO);
      // }

      return payload;
    }
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
    if (![3, 6].some((v) => v === hex.length)) throw new Err("Invalid color");
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((v) => v + v)
        .join("");
    return hex;
  }
  export function url(value: string) {
    if (!value.startsWith("http")) value = `http://${value}`;
    let url: URL;

    url = new URL(value);

    return url;
  }
  export function date(value: string, _context: Context) {
    const date = new Date(value);
    if (isNaN(date.getTime())) throw new Err("Invalid date");
    return date;
  }
  export function phone(value: string, _context: Context) {
    // phone number regex
    const regex =
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!value.match(regex)) throw new Err("Invalid phone number");
    return value;
  }
  export function email(value: string, _context: Context) {
    // email regex
    const regex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!value.match(regex)) throw new Err("Invalid email");
    return value;
  }
  export namespace Interactions {
    export async function command(value: string, context: InteractionContext) {
      const cmds = context.interactionCommandClient.commands.filter((v) => {
        return v.fullName.includes(value.toLowerCase().replace(/\s\s+/g, " "));
      });
      return cmds;
    }
    export namespace Autcomplete {
      export async function command(context: InteractionAutoCompleteContext) {
        const cmds = await Interactions.command(context.value, context as any);
        const choices = cmds.map((v) => {
          return {
            name: v.fullName,
            value: v.fullName,
          };
        });

        return await context.respond({ choices });
      }
    }
  }

  export namespace Default {
    export function user(context: Context) {
      return context.user;
    }
  }
}
