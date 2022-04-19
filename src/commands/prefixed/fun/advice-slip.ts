import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { AdviceSlip } from "pariah";
import { Slip } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand, FunMetadata } from "../basecommand";
export interface AdviceSlipArgs {
  slip?: number;
}
export default class AdviceSlipCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "advice-slip",
      aliases: ["advice", "slip", "adviceslip"],

      args: [{ name: "slip", type: "string", required: false }],
      metadata: FunMetadata("Get an advice slip", "<-slip: string=random>", [
        "-slip 10",
      ]),
    });
  }
  async run(context: Command.Context, args: AdviceSlipArgs) {
    const as = new AdviceSlip();
    let slip: Slip = await as.random();
    if (args.slip) {
      slip = await as.slip(args.slip);
    }
    if (!slip) {
      throw new Err("Invalid Slip ID", { status: 400 });
    }
    const embed = createBrandEmbed(Brand.ADVICE_SLIP, context);
    embed.setDescription(
      `Slip ID: ${slip.slip.id}\n${Markup.codeblock(slip.slip.advice)}`
    );
    return editOrReply(context, { embed });
  }
}
