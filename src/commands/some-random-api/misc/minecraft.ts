import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { SomeRandomAPI } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Markup } from "../../../functions/markup";
import { BaseCommand } from "../../basecommand";

export default class SRAMinecraftCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "mc",
    });
  }
  async run(context: Context, _args: {}) {
    const {} = await new SomeRandomAPI().minecraft(args.username);

    const embed = createBrandEmbed(Brand.SOME_RANDOM_API, context);
    embed.setTitle("Joke");
    embed.setDescription(Markup.codeblock(joke));
  }
}
