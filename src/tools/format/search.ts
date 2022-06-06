/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from "detritus-client/lib/command";
import {
  InteractionAutoCompleteContext,
  InteractionContext,
} from "detritus-client/lib/interaction";
import { Message } from "detritus-client/lib/structures";
import { APIs, Requester } from "pariah";
import { Brand } from "../../constants";
import { Secrets } from "../../secrets";
import { YoutubeSearch } from "../api";
import { Err } from "../error";
import { Markdown } from "../markdown";
import { Paginator } from "../paginator";
import { splitToFields, toTitleCase } from "../tools";
import { Embed } from "./embed";
import { Pxl } from "./pxl";

export module Search {
  export const youtubeInstance = new YoutubeSearch.API(
    Secrets.Key.Google.YouTubeData
  );

  export interface SearchArgs {
    query: string;
  }

  export async function youtube(
    context: Context | InteractionContext,
    args: SearchArgs
  ): Promise<Message | null> {
    const { query } = args;
    const { payload } = await youtubeInstance.search(query);

    if (!payload.items.length) {
      throw new Err("No results found", { status: 404 });
    }

    const paginator = new Paginator(context, {
      pageLimit: payload.items.length,
      onPage(page: number) {
        const embed = Embed.user(context);

        const item = payload.items[page - 1]!;

        embed.setTitle(item.snippet.title);
        embed.setDescription(
          item.snippet.description.replace(/\n{2,}/g, "\n\n")
        );

        embed.setImage(item.snippet.thumbnails.high.url);

        embed.setUrl(`https://www.youtube.com/watch?v=${item.id.videoId}`);

        embed.addField(
          "Channel",
          `[${item.snippet.channelTitle}](https://www.youtube.com/channel/${item.snippet.channelId})`,
          true
        );

        embed.addField(
          "Created At",
          `${Markdown.Format.timestamp(new Date(item.snippet.publishedAt))}`,
          true
        );

        return embed;
      },
    });

    return await paginator.start();
  }

  const pxlInstance = Pxl.instance;

  export async function image(
    context: Context | InteractionContext,
    args: SearchArgs
  ) {
    const { query } = args;
    const { payload: data } = await pxlInstance.imageSearch(
      query,
      APIs.PxlAPI.SafeSearch.STRICT,
      true
    );

    const paginator = new Paginator(context, {
      pageLimit: data.length,
      onPage: async (page) => {
        const image = data[page - 1]!;
        const embed = await Embed.image(
          context,
          image.url,
          "image-search.png",
          Brand.PXL
        );
        embed.setDescription(
          Markdown.Format.link(image.title, image.location).toString()
        );
        return embed;
      },
    });

    return await paginator.start();
  }

  export async function web(
    context: Context | InteractionContext,
    args: SearchArgs
  ) {
    const { query } = args;

    const { payload: data } = await pxlInstance.webSearch(
      query,
      APIs.PxlAPI.SafeSearch.STRICT
    );
    const paginator = new Paginator(context, {
      pageLimit: data.results.length,
      onPage: async (page) => {
        const result = data.results[page - 1]!;
        const embed = Embed.brand(context, Brand.PXL);

        embed.setDescription(result.description);
        embed.setTitle(result.title);
        embed.setUrl(result.url);

        if (data.relatedQueries.length) {
          embed.addField(
            "Related Queries",
            data.relatedQueries.map((x) => `\`${x}\``).join(", ")
          );
        }

        if (data.images[page - 1]) {
          embed.setThumbnail(data.images[page - 1]!);
        }

        return embed;
      },
    });

    return await paginator.start();
  }

  export const DictionaryInstance = new APIs.Dictionary.API(2, "en");

  export async function define(
    context: Context | InteractionContext,
    args: SearchArgs
  ): Promise<Message | null> {
    const { query } = args;
    const { payload, status } = await DictionaryInstance.entries(query);

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
      choices: Array.from(words).map((x) => ({
        name: toTitleCase(x),
        value: x,
      })),
    });
  }

  export const UrbanInstance = new APIs.Urban.API();

  export async function urban(
    context: Context | InteractionContext,
    args: SearchArgs
  ): Promise<Message | null> {
    const { query } = args;

    const { payload } = await UrbanInstance.define(query);

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

  export function fixUrbanLinks(data: string) {
    return data.replace(
      /\[(.+?)\]/g,
      (_, g1: string) =>
        `[${g1}](https://www.urbandictionary.com/define.php?term=${encodeURIComponent(
          g1
        )})`
    );
  }
}
