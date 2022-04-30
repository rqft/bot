import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { SomeRandomApi } from "pariah/dist/lib";
import { Brand } from "../../../../enums/brands";
import { createBrandEmbed } from "../../../../functions/embed";
import { Err } from "../../../../functions/error";
import { Markup } from "../../../../functions/markup";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, FunMetadata } from "../../basecommand";
export interface SRAPokedexArgs {
  pokemon: string;
}
export default class SRAPokedexCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pokedex",
      label: "pokemon",
      type: "string",
      required: true,
      metadata: FunMetadata(
        "Get information about a pokemon",
        "<pokemon: string>",
        ["bulbasaur", "ivysaur"]
      ),
    });
  }
  async run(context: Context, args: SRAPokedexArgs) {
    const pokemon = await new SomeRandomApi.API().pokemon(args.pokemon);
    if ("error" in pokemon) {
      throw new Err(pokemon.error);
    }

    const embed = createBrandEmbed(Brand.SOME_RANDOM_API, context);
    embed.setTitle(`${pokemon.name} (${pokemon.id})`);
    embed.setThumbnail(pokemon.sprites.animated);
    {
      const description: Array<string> = [];

      description.push(Markup.italics(pokemon.description));

      description.push(`**Type:** ${pokemon.type}`);
      description.push(`**Height:** ${pokemon.height}`);
      description.push(`**Weight:** ${pokemon.weight}`);

      description.push(`**Species:** ${pokemon.species.join(", ")}`);

      description.push(`**Generation:** ${pokemon.generation}`);
      // family
      {
        description.push(`**Family**`);
        pokemon.family.evolutionLine.forEach((item, i) => {
          let descriptor: "Self" | "Ancestor" | "Descendant" = "Self";

          if (i > pokemon.family.evolutionStage) {
            descriptor = "Descendant";
          } else if (i < pokemon.family.evolutionStage) {
            descriptor = "Ancestor";
          }

          description.push(
            `**->** ${
              descriptor === "Self" ? Markup.bold(item) : item
            } (${descriptor})`
          );
        });
      }

      // gender probabilities
      description.push(`**Gender Probabilities: ${pokemon.gender.join(", ")}`);

      // abilities
      description.push(`**Abilities**: ${pokemon.abilities.join(", ")}`);

      // stats
      {
        description.push(`**Stats**`);

        description.push(`**->** ${pokemon.stats.hp} HP`);
        description.push(`**->** ${pokemon.stats.attack} Attack`);
        description.push(`**->** ${pokemon.stats.defense} Defense`);
        description.push(`**->** ${pokemon.stats.sp_atk} Special Attack`);
        description.push(`**->** ${pokemon.stats.sp_def} Special Defense`);
        description.push(`**->** ${pokemon.stats.speed} Speed`);
      }

      embed.setDescription(description.join("\n"));
    }
    return editOrReply(context, { embed });
  }
}
