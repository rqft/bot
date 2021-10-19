//import { Command, CommandClient, Constants, Utils } from "detritus-client";
//import { transpile } from "typescript";
//import globalConf from "../../globalConf";
//import { altclients, client, selfclient } from "../../globals";
//import { messages } from "../../messages";
//import { BaseCommand } from "../basecommand";
//
//export default class EvalCommand extends BaseCommand {
//  constructor(client: CommandClient) {
//    super(client, {
//      label: "code",
//      name: "eval",
//      priority: 4587,
//      required: true,
//      args: [
//        { default: false, name: "noreply", type: Boolean },
//        { default: 2, name: "jsonspacing", type: "number" },
//      ],
//      onBefore: (context) =>
//        context.user.isClientOwner ||
//        globalConf.ownerIDs.includes(context.user.id),
//      onCancel: (context) =>
//        context.editOrReply(messages.permissions.missing_dev),
//      onError: (_context, _args, error) => console.error(error),
//    });
//  }
//  async run(_context: Command.Context, args: Command.ParsedArgs) {
//    const { matches } = Utils.regex(
//      Constants.DiscordRegexNames.TEXT_CODEBLOCK,
//      args.code
//    );
//    if (matches.length) {
//      args.code = matches[0]?.text;
//    }
//
//    let language = "ts";
//    let output;
//
//    const userBot = selfclient;
//    const alts = altclients;
//    [client, userBot, ...alts];
//    const input = args.code;
//    const transpiled = transpile(input, { strict: true });
//    output = await Promise.resolve(eval(transpiled));
//    if (typeof output === "object") language = "json";
//
//    // const em = new Embed();
//  }
//}
//
