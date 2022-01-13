import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { User } from "detritus-client/lib/structures";
import { Markup } from "detritus-client/lib/utils";
import { SomeRandomAPI } from "pariah";
import { Brand } from "../enums/brands";
import { createBrandEmbed, createImageEmbed } from "../functions/embed";
import { capitalizeWords, storeImage } from "./tools";

export enum Animals {
  BIRD = "bird",
  CAT = "cat",
  DOG = "dog",
  FOX = "fox",
  KANGAROO = "kangaroo",
  RED_PANDA = "redPanda",
  KOALA = "koala",
  PANDA = "panda",
  RACCOON = "raccoon",
}

export async function someRandomApiAnimal(context: Context, animal: Animals) {
  const sra = new SomeRandomAPI();
  const animals = await sra[animal]();
  const embed = await createImageEmbed(
    context,
    animals.link,
    animal,
    Brand.SOME_RANDOM_API
  );

  embed.setTitle(`${capitalizeWords(animal)} Image`);
  embed.setDescription(Markup.codeblock(animals.fact));

  return await context.editOrReply({ embed });
}

export enum Animus {
  WINK = "wink",
  PAT = "pat",
  HUG = "hug",
}

export async function someRandomApiAnimu(context: Context, animu: Animus) {
  const sra = new SomeRandomAPI();
  const animus = await sra[animu]();
  const embed = await createImageEmbed(
    context,
    animus.link,
    animu,
    Brand.SOME_RANDOM_API
  );

  embed.setTitle(`${capitalizeWords(animu)} Anime GIF`);

  return await context.editOrReply({ embed });
}
export async function infoUser(
  context: Context | InteractionContext,
  user: User
) {
  const embed = createBrandEmbed(Brand.VYBOSE, context);

  embed.setTitle(user.toString()).setUrl(user.jumpLink);

  return embed;
}
export enum Overlays {
  GAY = "/gay",
  GLASS = "/glass",
  WASTED = "/wasted",
  MISSION_PASSED = "/passed",
  JAIL = "/jail",
  COMRADE = "/comrade",
  TRIGGERED = "/triggered",
}
export enum Filters {
  GREYSCALE = "/greyscale",
  INVERT = "/invert",
  INVERT_GREYSCALE = "/invertgreyscale",
  BRIGHTNESS = "/brightness",
  THRESHOLD = "/threshold",
  SEPIA = "/sepia",
  RED = "/red",
  GREEN = "/green",
  BLOO = "/blue",
  BLURPLE = "/blurple",
  BLURPLE2 = "/blurple2",
  COLOR = "/color",
}
export enum Canvas {
  PIXELATE = "/pixelate",
  BLUR = "/blur",
  FAKE_YOUTUBE_COMMENT = "/youtube-comment",
  FAKE_TWEET = "/tweet",
  ITS_SO_STUPID = "/its-so-stupid",
  SIMPCARD = "/simpcard",
  HORNY = "/horny",
  LOLI_POLICE = "/lolice",
  COLOR_VIEWER = "/colorviewer",
}
export async function someRandomApiCanvas(
  context: Context,
  image: Buffer,
  endpoint: Overlays | Filters | Canvas,
  args: object
) {
  const sra = new SomeRandomAPI();
  const imageAttach = await storeImage(image, "attachment.gif");
  const a = Object.assign({ avatar: imageAttach.url! }, args);
  const canvas = await sra.canvas(endpoint, a);
  const embed = await createImageEmbed(
    context,
    canvas,
    undefined,
    Brand.SOME_RANDOM_API
  );
  return embed;
}
export async function someRandomApiOverlay(
  context: Context,
  image: Buffer,
  endpoint: Overlays
) {
  return await someRandomApiCanvas(context, image, endpoint, {});
}
export async function someRandomApiFilter(
  context: Context,
  image: Buffer,
  endpoint: Filters,
  args: object
) {
  return await someRandomApiCanvas(context, image, endpoint, args);
}
export async function someRandomApiCanvasMisc(
  context: Context,
  image: Buffer,
  endpoint: Canvas,
  args: object
) {
  return await someRandomApiCanvas(context, image, endpoint, args);
}
