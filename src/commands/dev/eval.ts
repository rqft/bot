import { Command, CommandClient, Constants, Utils } from "detritus-client";
import { client as client_ } from "../..";
import { tsEval } from "../../functions/eval";
import globalConf from "../../globalConf";
import { altclients, selfclient } from "../../globals";
import { messages } from "../../messages";
import { BaseCommand } from "../basecommand";
export default class EvalCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "code",
      name: "eval",
      priority: 4587,
      required: true,
      args: [
        { default: false, name: "noreply", type: Boolean },
        { default: 2, name: "jsonspacing", type: "number" },
      ],
      onBefore: (context) =>
        context.user.isClientOwner ||
        globalConf.ownerIDs.includes(context.user.id),
      onCancel: (context) =>
        context.editOrReply(messages.permissions.missing_dev),
      onError: (_context, _args, error) => console.error(error),
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const { matches } = Utils.regex(
      Constants.DiscordRegexNames.TEXT_CODEBLOCK,
      args.code
    );
    if (matches.length) {
      args.code = matches[0]?.text;
    }

    let language = "js";
    let message;
    try {
      const client = client_;
      const userBot = selfclient;
      const alts = altclients;
      [client, userBot, ...alts];
      message = await Promise.resolve(tsEval(args.code));
      if (typeof message === "object") {
        message = JSON.stringify(message, null, args.jsonspacing);
        language = "json";
      }
    } catch (error) {
      message = error ? error.stack || error.message : error;
    }
    const max = 1990 - language.length;
    if (!args.noreply) {
      return context.editOrReply(
        ["```" + language, String(message).slice(0, max), "```"].join("\n")
      );
    }
  }
}
