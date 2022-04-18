import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Affirmations } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand, FunMetadata } from "../basecommand";

export default class AdviceSlipCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "affirmations",
      metadata: FunMetadata("pulls some random ass affirmation")
    });
  }
  async run(context: Command.Context, _args: {}) {
    const as = new Affirmations();
    const affirmations = await as.run();
    const embed = createBrandEmbed(Brand.AFFIRMATIONS, context);
    embed.setDescription(Markup.codeblock(affirmations.affirmation));
    return editOrReply(context, { embed });
  }
}
