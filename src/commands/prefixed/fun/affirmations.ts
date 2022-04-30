import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Pariah } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand, FunMetadata } from "../basecommand";

export default class AdviceSlipCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "affirmations",
      metadata: FunMetadata("Get affirmations"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    const as = new Pariah(new URL("https://www.affirmations.dev/"));
    const affirmations = await as.get.json<{ affirmation: string }>("/");
    const embed = createBrandEmbed(Brand.AFFIRMATIONS, context);
    embed.setDescription(Markup.codeblock(affirmations.affirmation));
    return editOrReply(context, { embed });
  }
}
