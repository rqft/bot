import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { APIs } from "pariah";
import { Brand } from "../../../../enums/brands";
import { createBrandEmbed } from "../../../../functions/embed";
import { Markup } from "../../../../functions/markup";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, FunMetadata } from "../../basecommand";

export default class SRAJokeCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "joke",
      metadata: FunMetadata("Get a joke"),
    });
  }
  async run(context: Context, _args: {}) {
    const { joke } = await new APIs.SomeRandomApi.API().joke();

    const embed = createBrandEmbed(Brand.SOME_RANDOM_API, context);
    embed.setTitle("Joke");
    embed.setDescription(Markup.codeblock(joke));
    return await editOrReply(context, { embed });
  }
}
