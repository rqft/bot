import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Message } from "detritus-client/lib/structures";
import { APIs } from "pariah";
import { Brand } from "../../constants";
import { Secrets } from "../../secrets";
import { YoutubeSearch } from "../api";
import { Err } from "../error";
import { Markdown } from "../markdown";
import { Paginator } from "../paginator";
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
}
