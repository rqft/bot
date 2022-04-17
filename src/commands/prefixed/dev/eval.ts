import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import { Color } from "../../../globals";
import { BaseCommand } from "../basecommand";
export interface EvalArgs {
  code: string;
  jsonspacing: number;
}

export default class EvalCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "eval",
      priority: 4587,
      label: "code",
      type: Parameters.codeblock,
      required: true,
      args: [{ default: 2, name: "jsonspacing", type: "number" }],
      onBefore: (context) => context.user.isClientOwner,
      onCancel: () => {
        throw new Err("Not Authorized", { status: 403 });
      },
      onError: (_context, _args, error) => console.error(error),
    });
  }
  async run(context: Command.Context, args: EvalArgs) {
    let language = "ts";
    let message: any;
    let errored: boolean = false;
    try {
      message = await Promise.resolve(eval(args.code));

      if (typeof message === "object") {
        message = JSON.stringify(message, null, args.jsonspacing);
        language = "json";
      }
    } catch (error: any) {
      message = error ? error.stack || error.message : error;
      errored = true;
    }

    const embed = createBrandEmbed(Brand.VYBOSE, context, true);
    if (errored) {
      embed.setColor(Color.PRESENCE_BUSY);
    }
    embed.addField("Input", Markup.codeblock(args.code, { language: "ts" }));
    embed.addField(
      "Output",
      Markup.codeblock(message || "undefined", { language, mentions: false })
    );
    return await editOrReply(context, { embed });
  }
}
