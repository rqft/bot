import { Command, CommandClient, Constants, Utils } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { transpile } from "typescript";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { altclients, client, Color, selfclient } from "../../../globals";
import { messages } from "../../../messages";
import { BaseCommand } from "../basecommand";
export interface EvalArgs {
  code: string;
  jsonspacing: number;
}
export default class EvalCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "code",
      name: "eval",
      priority: 4587,
      required: true,
      args: [{ default: 2, name: "jsonspacing", type: "number" }],
      onBefore: (context) => context.user.isClientOwner,
      onCancel: (context) =>
        context.editOrReply(messages.permissions.missing_dev),
      onError: (_context, _args, error) => console.error(error),
    });
  }
  async run(context: Command.Context, args: EvalArgs) {
    console.log(args.code);
    const { matches } = Utils.regex(
      Constants.DiscordRegexNames.TEXT_CODEBLOCK,
      args.code
    );
    let inputLanguage = "ts";

    const match = matches[0];
    //if (!match || !match.text) throw new Error("Unable to parse this code");
    if (match) {
      args.code! = match!.text!;
      if (match!.language) inputLanguage = match!.language;
    }

    let language = "ts";
    let output;

    const userBot = selfclient;
    const alts = altclients;
    [client, userBot, ...alts];
    const input = args.code;
    const transpiled = transpile(input, { strict: true });
    let ok: boolean | null = true;
    try {
      output = eval(transpiled);
    } catch (e) {
      output = e;
      ok = false;
    }
    output = await Promise.resolve(output);
    if (output === undefined) ok = null;
    if (typeof output === "object") {
      language = "json";
      output = JSON.stringify(output, null, args.jsonspacing);
    }

    const embed = createBrandEmbed(Brand.VYBOSE, context);
    embed.setColor(colorFromState(ok));

    embed.addField(
      "Input",
      Markup.codeblock(input, { language: inputLanguage })
    );

    embed.addField(
      "Transpiled Code",
      Markup.codeblock(transpiled, { language: "js" })
    );

    embed.addField("Output", Markup.codeblock(output, { language }));

    return await context.editOrReply({ embed });
  }
}
function colorFromState(ok: true | false | null) {
  return ok === null
    ? Color.PRESENCE_OFFLINE
    : ok
    ? Color.PRESENCE_ONLINE
    : Color.PRESENCE_BUSY;
}
