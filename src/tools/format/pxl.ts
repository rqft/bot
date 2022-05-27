import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { APIs } from "pariah";
import { Brand } from "../../constants";
import { Secrets } from "../../secrets";
import { Markdown } from "../markdown";
import { Paginator } from "../paginator";
import { editOrReply } from "../tools";
import { ImageArgs } from "./basic";
import * as Embed from "./embed";


export const instance = new APIs.PxlAPI.API(Secrets.Key.PxlAPI);
export async function ajit(
  context: Context | InteractionContext,
  args: ImageArgs
) {
  const { target } = args;

  const { payload: image } = await instance.ajit([target]);
  const embed = await Embed.image(context, image, "ajit.png", Brand.PXL);

  return await editOrReply(context, { embed });
}
export interface EmojiMosaicArgs extends ImageArgs {
  "group-size"?: number;
  scale?: boolean;
}
export async function emojiMosaic(
  context: Context | InteractionContext,
  args: EmojiMosaicArgs
) {
  const { target, scale } = args;

  const { payload: image } = await instance.emojiMosaic([target], args["group-size"], scale);
  const embed = await Embed.image(
    context,
    image,
    "emoji-mosaic.png",
    Brand.PXL
  );

  return await editOrReply(context, { embed });
}
export interface EyesArgs extends ImageArgs {
  type: APIs.PxlAPI.Eyes;
}
export async function eyes(
  context: Context | InteractionContext,
  args: EyesArgs
) {
  const { target, type } = args;

  const { payload: image } = await instance.eyes([target], type);
  const embed = await Embed.image(
    context,
    image,
    `eyes-${type}.png`,
    Brand.PXL
  );

  return await editOrReply(context, { embed });
}
export interface FlagArgs extends ImageArgs {
  flag: APIs.PxlAPI.Flags;
  opacity?: number;
}
export async function flag(
  context: Context | InteractionContext,
  args: FlagArgs
) {
  const { target, flag, opacity } = args;

  const { payload: image } = await instance.flag([target], flag, opacity);
  const embed = await Embed.image(
    context,
    image,
    `flag-${flag}.png`,
    Brand.PXL
  );

  return await editOrReply(context, { embed });
}
export interface GlitchArgs extends ImageArgs {
  iterations?: number;
  amount?: number;
  "gif-count"?: number;
  "gif-delay"?: number;
}
export async function glitch(
  context: Context | InteractionContext,
  args: GlitchArgs
) {
  const { target, iterations, amount } = args;

  const { payload: image } = await instance.glitch([target], iterations, amount, {
    count: args["gif-count"],
    delay: args["gif-delay"],
  });
  const embed = await Embed.image(context, image, "glitch.gif", Brand.PXL);

  return await editOrReply(context, { embed });
}

export interface ImageSearchArgs {
  query: string;
}
export async function imageSearch(
  context: Context | InteractionContext,
  args: ImageSearchArgs
) {
  const { query } = args;
  const { payload: data } = await instance.imageSearch(
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
export interface JpegArgs extends ImageArgs {
  quality?: number;
}
export async function jpeg(
  context: Context | InteractionContext,
  args: JpegArgs
) {
  const { target, quality } = args;

  const { payload: image } = await instance.jpeg([target], quality);
  const embed = await Embed.image(context, image, "jpeg.png", Brand.PXL);
  return await editOrReply(context, { embed });
}

export async function lego(
  context: Context | InteractionContext,
  args: EmojiMosaicArgs
) {
  const { target, scale } = args;

  const { payload: image } = await instance.lego([target], args["group-size"], scale);
  const embed = await Embed.image(context, image, "lego.png", Brand.PXL);

  return await editOrReply(context, { embed });
}

export interface ScreenshotArgs {
  url: URL;
  browser?: APIs.PxlAPI.ScreenshotBrowser;
  "full-page"?: boolean;
  locale?: string;
  theme?: APIs.PxlAPI.ScreenshotTheme;
}

export async function screenshot(
  context: Context | InteractionContext,
  args: ScreenshotArgs
) {
  const { url, browser, locale, theme } = args;

  const { payload: image } = await instance.screenshot(url.toString(), {
    browser,
    locale,
    theme,
    fullPage: args["full-page"],
  });

  const embed = await Embed.image(context, image, "screenshot.png", Brand.PXL);
  embed.setDescription(`URL: ${url.toString()}`);

  return await editOrReply(context, { embed });
}

export interface SnapchatArgs extends ImageArgs {
  filter: APIs.PxlAPI.SnapchatFilters;
}
export async function snapchat(
  context: Context | InteractionContext,
  args: SnapchatArgs
) {
  const { target, filter } = args;

  const { payload: image } = await instance.snapchat([target], filter);
  const embed = await Embed.image(context, image, "snapchat.png", Brand.PXL);

  return await editOrReply(context, { embed });
}
export interface TextArgs {
  text: string;
}
export async function sonic(
  context: Context | InteractionContext,
  args: TextArgs
) {
  const { text } = args;

  const { payload: image } = await instance.sonic(text);
  const embed = await Embed.image(context, image, "sonic.png", Brand.PXL);

  return await editOrReply(context, { embed });
}
export async function thonkify(
  context: Context | InteractionContext,
  args: TextArgs
) {
  const { text } = args;

  const { payload: image } = await instance.thonkify(text);
  const embed = await Embed.image(context, image, "thonkify.png", Brand.PXL);

  return await editOrReply(context, { embed });
}
export async function webSearch(
  context: Context | InteractionContext,
  args: ImageSearchArgs
) {
  const { query } = args;

  const { payload: data } = await instance.webSearch(query, APIs.PxlAPI.SafeSearch.STRICT);
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
