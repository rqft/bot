import { Command, CommandClient } from "detritus-client";
import { Brand } from "../../../enums/brands";
import { Dalle } from "../../../functions/dalle";
import { createBrandEmbed } from "../../../functions/embed";
import { Paginator } from "../../../functions/paginator";
import { BaseCommand, FunMetadata } from "../basecommand";
export interface Gpt2Args {
  text: string;
}
export default class Gpt2Command extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "gpt2",
      type: String,
      label: "text",
      metadata: FunMetadata("Generate text", "<text: string>"),
    });
  }
  async run(context: Command.Context, args: Gpt2Args) {
    const open = new Dalle();
    const text = await open.gpt2(args.text);
    console.log(text);
    const paginator = new Paginator(context, {
      pageLimit: text.length,
      onPage: (p) => {
        const item = text[p - 1]!;
        const embed = createBrandEmbed(Brand.OPENAI, context, false);
        embed.setDescription(item.generated_text);
        return embed;
      },
    });
    return await paginator.start();
  }
}
