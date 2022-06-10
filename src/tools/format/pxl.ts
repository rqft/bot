import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { APIs } from "pariah";
import { Brand } from "../../constants";
import { Secrets } from "../../secrets";
import { editOrReply } from "../tools";
import { Basic } from "./basic";
import { Embed } from "./embed";

export module Pxl {
  export const instance = new APIs.PxlAPI.API(Secrets.Key.PxlAPI);
  export async function ajit(
    context: Context | InteractionContext,
    args: Basic.MediaArgs
  ) {
    const { target } = args;

    const { payload: image } = await instance.ajit([target]);
    const embed = await Embed.image(context, image, "ajit.png", Brand.PXL);

    return await editOrReply(context, { embed });
  }
  export interface EmojiMosaicArgs extends Basic.MediaArgs {
    "group-size"?: number;
    scale?: boolean;
  }
  export async function emojiMosaic(
    context: Context | InteractionContext,
    args: EmojiMosaicArgs
  ) {
    const { target, scale } = args;

    const { payload: image } = await instance.emojiMosaic(
      [target],
      args["group-size"],
      scale
    );
    const embed = await Embed.image(
      context,
      image,
      "emoji-mosaic.png",
      Brand.PXL
    );

    return await editOrReply(context, { embed });
  }
  export interface EyesArgs extends Basic.MediaArgs {
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
  export interface FlagArgs extends Basic.MediaArgs {
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
  export interface GlitchArgs extends Basic.MediaArgs {
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

    const { payload: image } = await instance.glitch(
      [target],
      iterations,
      amount,
      {
        count: args["gif-count"],
        delay: args["gif-delay"],
      }
    );
    const embed = await Embed.image(context, image, "glitch.gif", Brand.PXL);

    return await editOrReply(context, { embed });
  }

  export interface JpegArgs extends Basic.MediaArgs {
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

    const { payload: image } = await instance.lego(
      [target],
      args["group-size"],
      scale
    );
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

    const embed = await Embed.image(
      context,
      image,
      "screenshot.png",
      Brand.PXL
    );
    embed.setDescription(`URL: ${url.toString()}`);

    return await editOrReply(context, { embed });
  }

  export interface SnapchatArgs extends Basic.MediaArgs {
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
}
