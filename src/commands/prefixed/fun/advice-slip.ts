import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { AdviceSlip } from "pariah";
import { Slip } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { BaseCommand } from "../basecommand";
export interface AdviceSlipArgs {
  slip?: number;
}
export default class AdviceSlipCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "advice-slip",
      aliases: ["advice", "slip", "adviceslip"],

      args: [{ name: "slip", type: "string", required: false }],
    });
  }
  async run(context: Command.Context, args: AdviceSlipArgs) {
    const as = new AdviceSlip();
    let slip: Slip = await as.random();
    if (args.slip) {
      slip = await as.slip(args.slip);
    }
    if (!slip) return await context.editOrReply("❌ Invalid Slip ID");
    const embed = createBrandEmbed(Brand.ADVICE_SLIP, context);
    embed.setDescription(
      `Slip ID: ${slip.slip.id}\n${Markup.codeblock(slip.slip.advice)}`
    );
    return context.editOrReply({ embed });
  }
}
