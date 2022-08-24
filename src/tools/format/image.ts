import { APIs } from "@rqft/fetch";
import { Jonathan } from "@rqft/fetch/dist/lib";
import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Message } from "detritus-client/lib/structures";

import { Sarah, Waifu2x } from "../api";
import { Err } from "../error";
import {
  editOrReply,
  extensionFromFileName,
  extensionFromHeaders,
  fileNameFromUrl,
} from "../tools";
import { Basic } from "./basic";
import { Embed } from "./embed";

export module Image {
  export const instance = new Sarah();
  export interface MirrorArgs extends Basic.MediaArgs {
    method: APIs.Jonathan.MirrorMethods;
  }
  export async function mirror(
    context: Context | InteractionContext,
    args: MirrorArgs
  ) {
    const { target, method } = args;
    const m = method || APIs.Jonathan.MirrorMethods.LEFT;

    const { payload: image, headers } = await instance.imageMirror(target, m);

    const embed = await Embed.image(
      context,
      image,
      `mirror-${m.toLowerCase()}.${extensionFromHeaders(headers)}`
    );
    return await editOrReply(context, { embed });
  }
  export async function spin(
    context: Context | InteractionContext,
    args: Basic.MediaArgs
  ) {
    const { target } = args;

    const { payload: image } = await instance.imageSpin(target);

    const embed = await Embed.image(context, image, "spin.gif");
    return await editOrReply(context, { embed });
  }
  export interface ColorArgs {
    color: string;
    size: number;
  }
  export async function color(
    context: Context | InteractionContext,
    args: ColorArgs
  ) {
    const { color, size } = args;

    const { payload: image } = await instance.imageColor(size, color);

    const embed = await Embed.image(context, image, "color.png");
    return await editOrReply(context, { embed });
  }
  export interface ResizeArgs extends Basic.MediaArgs {
    size: string;
  }
  export async function resize(
    context: Context | InteractionContext,
    args: ResizeArgs
  ) {
    const { target, size } = args;

    const { payload: image, headers } = await instance.imageResize(
      target,
      size
    );

    const embed = await Embed.image(
      context,
      image,
      `resize.${extensionFromHeaders(headers)}`
    );
    return await editOrReply(context, { embed });
  }
  export interface RotateArgs extends Basic.MediaArgs {
    degrees: number;
  }
  export async function rotate(
    context: Context | InteractionContext,
    args: RotateArgs
  ) {
    let { target, degrees } = args;
    degrees %= 360;

    const { payload: image, headers } = await instance.imageRotate(
      target,
      degrees
    );

    const embed = await Embed.image(
      context,
      image,
      `rotate.${extensionFromHeaders(headers)}`
    );
    embed.setDescription(`Angle: ${degrees} degree(s)`);

    return await editOrReply(context, { embed });
  }

  export async function url(
    context: Context | InteractionContext,
    args: Basic.MediaArgs
  ) {
    const name = fileNameFromUrl(args.target) || "unknown.gif";
    const embed = await Embed.image(
      context,
      args.target,
      "url." + extensionFromFileName(name)
    );

    embed.setDescription(`URL: [${name}](${args.target})`);
    return await editOrReply(context, { embed });
  }

  export interface TiltArgs extends Basic.MediaArgs {
    amount?: number;
  }

  export async function tilt(
    context: Context | InteractionContext,
    args: TiltArgs
  ) {
    const { target, amount } = args;

    const { payload: image, headers } = await instance.imageTilt(
      target,
      amount
    );

    const embed = await Embed.image(
      context,
      image,
      `tilt.${extensionFromHeaders(headers)}`
    );
    return await editOrReply(context, { embed });
  }

  export interface TintArgs extends Basic.MediaArgs {
    color: string;
    opacity?: number;
  }

  export async function tint(
    context: Context | InteractionContext,
    args: TintArgs
  ) {
    const { target, color, opacity } = args;

    const { payload: image, headers } = await instance.imageTint(
      target,
      color,
      (opacity || 50) / 100
    );

    const embed = await Embed.image(
      context,
      image,
      `tint.${extensionFromHeaders(headers)}`
    );

    return await editOrReply(context, { embed });
  }

  export async function averageColor(
    context: Context | InteractionContext,
    args: Basic.MediaArgs
  ) {
    const { target } = args;

    const {
      payload: { data: color },
    } = await instance.imageAverageColor(target);

    const { payload: image } = await instance.imageColor(
      512,
      color.toString(16)
    );

    const embed = await Embed.image(context, image, "color.png");
    return await editOrReply(context, { embed });
  }

  export interface AmountArgs extends Basic.MediaArgs {
    amount?: number;
  }

  export async function brightness(
    context: Context | InteractionContext,
    args: AmountArgs
  ) {
    const { target, amount } = args;

    const { payload: image, headers } = await instance.imageBrightness(
      target,
      (amount || 50) / 100
    );

    const embed = await Embed.image(
      context,
      image,
      `brightness.${extensionFromHeaders(headers)}`
    );
    return await editOrReply(context, { embed });
  }

  export async function fisheye(
    context: Context | InteractionContext,
    args: AmountArgs
  ) {
    const { target, amount } = args;

    const { payload: image, headers } = await instance.imageFisheye(
      target,
      amount || 2
    );

    const embed = await Embed.image(
      context,
      image,
      `fisheye.${extensionFromHeaders(headers)}`
    );
    return await editOrReply(context, { embed });
  }

  export interface InvertArgs extends Basic.MediaArgs {
    method?: APIs.Jonathan.InvertMethods;
  }

  export async function invert(
    context: Context | InteractionContext,
    args: InvertArgs
  ) {
    const { target, method } = args;
    const m = method || APIs.Jonathan.InvertMethods.INVERT;

    const { payload: image } = await instance.imageInvert(target, m);

    const embed = await Embed.image(
      context,
      image,
      `invert-${m.toLowerCase()}.png`
    );
    return await editOrReply(context, { embed });
  }

  export async function saturation(
    context: Context | InteractionContext,
    args: AmountArgs
  ) {
    const { target, amount } = args;

    const { payload: image, headers } = await instance.imageSaturation(
      target,
      (amount || 50) / 100
    );

    const embed = await Embed.image(
      context,
      image,
      `saturation.${extensionFromHeaders(headers)}`
    );
    return await editOrReply(context, { embed });
  }

  const w2xInstance = new Waifu2x.API();
  export async function upscale(
    context: Context | InteractionContext,
    args: Basic.MediaArgs
  ) {
    const { target } = args;

    const { payload: image } = await w2xInstance.use(target);

    const embed = await Embed.image(context, image, "upscale.png");
    return await editOrReply(context, { embed });
  }

  interface GenerateArgs {
    query: string;
    style: keyof typeof APIs.Jonathan.WomboStyles;
  }

  export async function generate(
    context: Context | InteractionContext,
    args: GenerateArgs
  ) {
    const { query, style } = args;

    const { payload } = await instance.wombo(style, query);

    if (payload.status.state === "error") {
      throw new Err(payload.status.message, { status: payload.status.code });
    }

    const embed = await Embed.image(
      context,
      payload.data,
      "wombo.png",
      undefined,
      true
    );

    return await editOrReply(context, { embed });
  }

  export interface GraphArgs extends Jonathan.GraphOptions {
    expr: string;
  }

  export async function graph(
    context: Context | InteractionContext,
    args: GraphArgs
  ): Promise<Message | null> {
    console.log(instance.url);
    const r = await instance.graph(args.expr, args);

    const txt = new TextDecoder().decode(r.payload);

    let j: unknown = null;

    try {
      j = JSON.parse(txt);
    } catch {
      const embed = await Embed.image(context, r.payload, "graph.png");

      return await editOrReply(context, { embed });
    }

    if (j !== null || j !== undefined) {
      if (a(j)) {
        throw new Err(j.status.message, { status: j.status.code });
      }
    }

    return null;
  }
}

function a(j: unknown): j is Jonathan.Result<never> {
  return "status" in (j as never);
}
