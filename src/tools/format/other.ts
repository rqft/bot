/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from "detritus-client/lib/command";
import {
  InteractionAutoCompleteContext,
  InteractionContext,
} from "detritus-client/lib/interaction";
import { Message } from "detritus-client/lib/structures";
import * as Process from "node:child_process";
import { APIs, Requester } from "pariah";
import { Err } from "../error";
import { Markdown } from "../markdown";
import { Paginator } from "../paginator";
import { editOrReply, splitToFields, toTitleCase } from "../tools";
import { Embed } from "./embed";
export interface CodeArgs {
  code: string;
  "json-spacing": number;
}
export async function code(
  context: Context | InteractionContext,
  args: CodeArgs
): Promise<Message | null> {
  if (!context.client.isOwner(context.userId)) {
    throw new Err("no", { status: 403 });
  }

  const text = args.code;
  let language = "ts";
  let message: string;
  try {
    message = await Promise.resolve(eval(text));

    if (typeof message === "object") {
      message = JSON.stringify(message, null, args["json-spacing"]);
      language = "json";
    }
  } catch (error) {
    message =
      error instanceof Error
        ? error.stack || error.message
        : error instanceof Err
        ? error.toString()
        : (error as string);
  }

  message = String(message);

  return await editOrReply(
    context,
    Markdown.Format.codeblock(message, language).toString()
  );
}
export interface ExecArgs {
  code: string;
}
export async function exec(
  context: Context | InteractionContext,
  args: ExecArgs
): Promise<Message | null> {
  if (!context.client.isOwner(context.userId)) {
    throw new Err("no", { status: 403 });
  }
  const text = args.code;
  let message = "";
  try {
    const data = Process.execSync(text);
    message = data.toString("utf-8");
  } catch (error) {
    message = (error as Error).message;
  }

  return await editOrReply(
    context,
    Markdown.Format.codeblock(message).toString()
  );
}
export interface KwanziArgs {
  text: string;
}
export async function kwanzi(
  context: Context | InteractionContext,
  args: KwanziArgs
): Promise<Message | null> {
  const { text: payload } = args;
  const list = Array.from(new Set(payload.toLowerCase().split(" ")));
  const hit: Array<string> = [];
  const output: Array<string> = [];

  while (hit.length < list.length) {
    const index = Math.floor(Math.random() * list.length);
    const item = list[index]!;
    output.push(item);
    if (hit.includes(item)) {
      continue;
    }

    hit.push(item);
    if (Math.random() > 0.7) {
      list.splice(index, 1);
    }
  }

  return await editOrReply(context, output.join(" "));
}

export async function stats(
  context: Context | InteractionContext
): Promise<void> {
  const embed = Embed.user(context);
  if (embed) {
    void 0;
  }
}

export const DictionaryInstance = new APIs.Dictionary.API(2, "en");

export interface DefineArgs {
  word: string;
}

export async function define(
  context: Context | InteractionContext,
  args: DefineArgs
): Promise<Message | null> {
  const { word } = args;
  const { payload, status } = await DictionaryInstance.entries(word);

  if ("title" in payload) {
    throw new Err(payload.title, { status });
  }

  const pages = payload
    .map((x) => x.meanings.map((y) => ({ ...x, meaning: y })))
    .flat();

  const paginator = new Paginator(context, {
    pageLimit: pages.length,
    onPage(page) {
      const item = pages[page - 1]!;
      const embed = Embed.user(context);

      embed.setTitle(item.word);

      {
        const description: Array<string> = [];

        for (const phonetic of item.phonetics) {
          description.push(
            `[${phonetic.text || item.word}](${
              phonetic.audio || phonetic.sourceUrl
            })`
          );
        }

        embed.addField("Phonetics", description.join(", "));
      }

      {
        const description: Array<string> = [];
        for (const { definition, example } of item.meaning.definitions) {
          // if (description.join("\n\n").length > 950) {
          //   break;
          // }
          description.push(
            " - " +
              definition +
              (example ? " " + Markdown.Format.italics(example) : "")
          );
        }

        const fields = splitToFields(description.join("\n"), 512, "\n");

        for (const field of fields) {
          embed.addField("Definitions", field, true);
        }
      }

      return embed;
    },
  });

  return await paginator.start();
}

export async function definitions(context: InteractionAutoCompleteContext) {
  const req = new Requester(
    new URL("https://www.merriam-webster.com/lapi/v1/")
  );

  if (!context.value) {
    const results: Array<string> =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (await req.json<any>("/mwol-mp/get-lookups-data-homepage")).payload.data
        .words;

    return await context.respond({
      choices: [
        {
          name: "Type or pick one of the words below",
          value: "...",
        },
        ...results
          .slice(0, 24)
          .map((x) => ({ name: toTitleCase(x), value: x })),
      ],
    });
  }

  const words: Set<string> = new Set(
    (
      await req.json<any>(`/mwol-search/autocomplete`, {
        search: context.value,
      })
    ).payload.docs
      .filter((x: { ref: string }) => x.ref === "owl-combined")
      .map((x: { word: string }) => x.word)
      .slice(0, 25)
  );

  return await context.respond({
    choices: Array.from(words).map((x) => ({ name: toTitleCase(x), value: x })),
  });
}

export const UrbanInstance = new APIs.Urban.API();

export async function urban(
  context: Context | InteractionContext,
  args: DefineArgs
): Promise<Message | null> {
  const { word } = args;

  const { payload } = await UrbanInstance.define(word);

  if (!payload.list.length) {
    throw new Err("No results found", { status: 404 });
  }

  const paginator = new Paginator(context, {
    pageLimit: payload.list.length,
    onPage(page) {
      const item = payload.list[page - 1]!;
      const embed = Embed.user(context);

      embed.setTitle(item.word);
      embed.setDescription(fixUrbanLinks(item.definition));
      embed.setUrl(item.permalink);

      embed.addField("Example", fixUrbanLinks(item.example));

      embed.setTimestamp(item.written_on);

      embed.addField("Upvotes", item.thumbs_up.toLocaleString(), true);
      embed.addField("Downvotes", item.thumbs_down.toLocaleString(), true);

      return embed;
    },
  });

  return await paginator.start();
}

function fixUrbanLinks(data: string) {
  return data.replace(
    /\[(.+?)\]/g,
    (_, g1: string) =>
      `[${g1}](https://www.urbandictionary.com/define.php?term=${encodeURIComponent(
        g1
      )})`
  );
}

export async function ping(
  context: Context | InteractionContext
): Promise<Message | null> {
  const ts =
    "message" in context
      ? context.message.createdAtUnix || context.message.editedAtUnix
      : context.interaction.createdAtUnix;
  return await editOrReply(context, `${Date.now() - ts}ms`);
}
