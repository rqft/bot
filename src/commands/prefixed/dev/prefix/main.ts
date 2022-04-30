import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { Markup } from "detritus-client/lib/utils";
import { Err } from "../../../../functions/error";
import { Prefixes } from "../../../../functions/prefix";
import { BaseCommand, UtilityMetadata } from "../../basecommand";

export default class PrefixesCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "prefix",
      metadata: UtilityMetadata("Gets this server's prefixes"),
      priority: -1,
    });
  }
  async run(context: Context, _args: never) {
    const editor = new Prefixes(context, true);
    const prefixes = editor.prefixes;
    if (prefixes.size === 0) {
      throw new Err("No Prefixes", { status: 404 });
    }
    return await context.editOrReply(
      `This server's prefixes are ${Array.from(prefixes)
        .map((prefix) => Markup.codestring(prefix))
        .join(", ")}`
    );
  }
}
