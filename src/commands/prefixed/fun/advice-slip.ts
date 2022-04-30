import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Pariah } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand, FunMetadata } from "../basecommand";
export interface AdviceSlipArgs {
  slip?: number;
}
interface Slip {
  slip: {
    advice: string;
    id: number;
  };
}
export default class AdviceSlipCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "advice-slip",
      aliases: ["advice", "slip", "adviceslip"],

      args: [{ name: "slip", type: "string", required: false }],
      metadata: FunMetadata("Get an advice slip", "<-slip: string=random>", [
        "-slip hello",
      ]),
    });
  }
  async run(context: Command.Context, args: AdviceSlipArgs) {
    const as = new Pariah(new URL("https://api.adviceslip.com/"));
    let slip: Slip = await as.get.json("/advice");
    if (args.slip) {
      slip = await as.get.json("/advice/search/:query", {
        ":query": args.slip,
      });
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
