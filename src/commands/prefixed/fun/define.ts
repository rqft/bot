import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Pariah } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Paginator } from "../../../functions/paginator";
import { capitalizeWords } from "../../../functions/tools";
import { BaseCommand, ToolsMetadata } from "../basecommand";
export interface DefineArgs {
  word: string;
}
export interface Phonetic {
  text: string;
  audio?: string;
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
      metadata: ToolsMetadata("Define a word", "<word: string>"),
    });
  }
  async run(context: Command.Context, args: DefineArgs) {
    const dict = new Pariah(new URL("https://api.dictionaryapi.dev/"));
    const words = await dict.get.json<Array<Definitions>>(
      `/api/v2/entries/en/${args.word}`
    );
    if ("title" in words || words.length === 0)
      throw new Err("No definitions found");
    const { meanings, phonetics, word } = words[0]!;

    const paginator = new Paginator(context, {
      pageLimit: meanings.length,
      onPage(page: number) {
        const embed = createBrandEmbed(Brand.MERRIAM_WEBSTER, context);
        embed.setTitle(`Definitions for ${capitalizeWords(word)}`);
        embed.addField(
          "Phonetics",
          phonetics
            .map((p) => Markup.url(p.text, p.audio ?? "", "Audio"))
            .join("\n")
        );
        const meaning = meanings[page - 1]!;
        embed.addField("Part of Speech", meaning.partOfSpeech);
        embed.addField(
          "Definitions",
          meaning.definitions
            .map(
              (def, index) =>
                `**${index + 1}.** ${def.definition}${
                  def.example ? "\n" + Markup.italics(def.example) + "\n" : ""
                }`
            )
            .join("\n")
        );
        return embed;
      },
    });
    return await paginator.start();
  }
}
