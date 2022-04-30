import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import {} from "../../../globals";
import { BaseCommand, UtilityMetadata } from "../basecommand";
export interface EvalArgs {
  code: { text: string };
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
      metadata: UtilityMetadata("Evaluate code", "<code>", [
        "1 + 1",
        "context.client.token",
      ]),
    });
  }
  async run(context: Command.Context, args: EvalArgs) {
    const { code: match } = args;
    const { text: code } = match;
    let language = "ts";
    let message: any;
    try {
      message = await Promise.resolve(eval(code));
      if (typeof message === "object") {
        message = JSON.stringify(message, null, args.jsonspacing);
        language = "json";
      }
    } catch (err) {
      message = err instanceof Error ? err.stack || err.message : err;
    }
    message = String(message);

    return await editOrReply(
      context,
      Markup.codeblock(message, { language, mentions: false })
    );
  }
}
