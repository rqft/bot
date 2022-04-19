import { Command, CommandClient } from "detritus-client";
import { Pariah } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { capitalizeWords, editOrReply } from "../../../functions/tools";
<<<<<<< HEAD
import { BaseCommand, ToolsMetadata } from "../basecommand";
=======
import { BaseCommand, FunMetadata } from "../basecommand";
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
export interface DefineArgs {
  word: string;
}
export interface Phonetic {
  text: string;
  audio: string;
}
export interface Meaning {
  partOfSpeech: string;
  definitions: Array<Definition>;
}
export interface Definition {
  definition: string;
  example: string;
  synonyms?: Array<string>;
}
export interface Definitions {
  word: string;
  phonetics: Array<Phonetic>;
  meanings: Array<Meaning>;
}

export default class DefineCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "define",

      label: "word",
      type: "string",
      required: true,
<<<<<<< HEAD
      metadata: ToolsMetadata("Define a word", "<word: string>"),
=======
      metadata: FunMetadata("Gets the dictionary definition of a word", "<word: string>", ["oranges"])
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
    });
  }
  async run(context: Command.Context, args: DefineArgs) {
    const dict = new Pariah({ baseUrl: "https://api.dictionaryapi.dev/" });
    const words = await dict.getJSON<Array<Definitions>>(
      `/api/v2/entries/en/${args.word}`
    );
    if ("title" in words || words.length === 0)
      throw new Err("no definitions found");
    const embed = createBrandEmbed(Brand.MERRIAM_WEBSTER, context);
    embed.setTitle(`Definitions for ${capitalizeWords(args.word)}`);
    {
      const description: Array<string> = [];
      for (const word of words) {
        if (word.phonetics.length)
          description.push(`*${word.phonetics.map((v) => v.text).join(", ")}*`);
        for (const meaning of word.meanings) {
          description.push(
            `**${word.word}** - ${capitalizeWords(meaning.partOfSpeech)}`
          );

          const [definition] = meaning.definitions;
          if (!definition) continue;

          description.push(`${definition.definition}`);

          if (definition.example) description.push(`*${definition.example}*`);

          if (definition.synonyms)
            description.push(
              `**Synonyms**: ${definition.synonyms
                .filter((_, i) => i < 5)
                .join(", ")}`
            );
          description.push("\n");
        }
      }
      embed.setDescription(description.join("\n"));
    }
    return editOrReply(context, { embed });
  }
}
