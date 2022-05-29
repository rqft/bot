import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { MirrorMethods } from "../../api/routes/image.flop";
import { Secrets } from "../../secrets";
import { Jonathan } from "../api";
import { editOrReply } from "../tools";
import { Basic } from "./basic";
import { Embed } from "./embed";

export module Image {
  export const instance = new Jonathan.API(Secrets.ApiToken);
  export interface MirrorArgs extends Basic.ImageArgs {
    method: MirrorMethods;
  }
  export async function mirror(
    context: Context | InteractionContext,
    args: MirrorArgs
  ) {
    const { target, method } = args;
    const m = method || MirrorMethods.LEFT;

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
}