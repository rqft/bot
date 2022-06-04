import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { APIs } from "pariah";

import { Secrets } from "../../secrets";
import { editOrReply, extensionFromFileName, fileNameFromUrl } from "../tools";
import { Basic } from "./basic";
import { Embed } from "./embed";

export module Image {
  export const instance = new APIs.Jonathan.API(Secrets.ApiToken);
  export interface MirrorArgs extends Basic.ImageArgs {
    method: APIs.Jonathan.MirrorMethods;
  }
  export async function mirror(
    context: Context | InteractionContext,
    args: MirrorArgs
  ) {
    const { target, method } = args;
    const m = method || APIs.Jonathan.MirrorMethods.LEFT;

    const { payload: image } = await instance.imageMirror(target, m);

    const embed = await Embed.image(
      context,
      image,
      `mirror-${m.toLowerCase()}.png`
    );
    return await editOrReply(context, { embed });
  }
  export async function spin(
    context: Context | InteractionContext,
    args: Basic.ImageArgs
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
  export interface ResizeArgs extends Basic.ImageArgs {
    size: string;
  }
  export async function resize(
    context: Context | InteractionContext,
    args: ResizeArgs
  ) {
    const { target, size } = args;

    const { payload: image } = await instance.imageResize(target, size);

    const embed = await Embed.image(context, image, "resize.png");
    return await editOrReply(context, { embed });
  }
  export interface RotateArgs extends Basic.ImageArgs {
    degrees: number;
  }
  export async function rotate(
    context: Context | InteractionContext,
    args: RotateArgs
  ) {
    let { target, degrees } = args;
    degrees %= 360;

    const { payload: image } = await instance.imageRotate(target, degrees);

    const embed = await Embed.image(context, image, "rotate.png");
    embed.setDescription(`Angle: ${degrees} degree(s)`);

    return await editOrReply(context, { embed });
  }

  export async function url(
    context: Context | InteractionContext,
    args: Basic.ImageArgs
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
}
