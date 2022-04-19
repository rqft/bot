import { Command, CommandClient } from "detritus-client";
import { Locales } from "detritus-client/lib/constants";
import { Pariah } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand, UtilityMetadata } from "../basecommand";
export interface TranslateArgs {
  text: string;
  from?: string;
  to: string;
}
export default class TranslateCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "translate",
      aliases: ["tr"],

      label: "text",
      type: "string",
      required: true,

      args: [
        {
          name: "from",
          type: "string",
          default: "en",
          choices: Object.values(Locales),
        },
        {
          name: "to",
          type: "string",
          default: "en",
          choices: Object.values(Locales),
        },
      ],
      metadata: UtilityMetadata(
        "Translate text",
        "<text: string> ?<-from: Locales=en> ?<-to: Locales=en>"
      ),
    });
  }
  async run(context: Command.Context, args: TranslateArgs) {
    const tr = new Pariah({ baseUrl: "https://translate.mentality.rip/" });
    if (!args.from) args.from = (await detectLanguage(tr, args.text)).language;

    const embed = createBrandEmbed(Brand.VYBOSE, context, true);

    embed.setTitle(`Translation from ${args.from} to ${args.to}`);

    return editOrReply(context, { embed });
  }
}
export interface DetectedLanguage {
  confidence: number;
  language: string;
}
async function detectLanguage(translator: Pariah, text: string) {
  const detect = await translator.postJSON<Array<DetectedLanguage>>(
    `/detect?q=${text}`
  );
  if (!detect.length) throw new Err("cant detect language");

  return detect[0]!;
}
