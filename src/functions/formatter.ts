import { Context } from "detritus-client/lib/command";
import { Markup } from "detritus-client/lib/utils";
import { SomeRandomAPI } from "pariah";
import { Brand } from "../enums/brands";
import { createBrandEmbed } from "../functions/embed";
import { capitalizeWords } from "./tools";
export enum Animals {
  BIRD = "bird",
  CAT = "cat",
  DOG = "dog",
  FOX = "fox",
  KANGAROO = "kangaroo",
  KOALA = "koala",
  PANDA = "panda",
  RACCOON = "raccoon",
}

export async function someRandomApiAnimal(context: Context, animal: Animals) {
  const embed = createBrandEmbed(Brand.SOME_RANDOM_API, context);

  const sra = new SomeRandomAPI();
  const animals = await sra[animal]();

  embed.setTitle(`${capitalizeWords(animal)} Image`);
  embed.setDescription(Markup.codeblock(animals.fact));
  embed.setImage(animals.image);

  return await context.editOrReply({ embed });
}
