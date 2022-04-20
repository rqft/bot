import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { Markup } from "detritus-client/lib/utils";
import { Err } from "../../../../functions/error";
import { Prefixes } from "../../../../functions/prefix";
import { BaseCommand, UtilityMetadata } from "../../basecommand";
export interface RemovePrefixArgs {
  prefix: string;
}
export default class RemovePrefixCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "prefix remove",
      type: [{ name: "prefix", type: "string", required: true }],
      metadata: UtilityMetadata(
        "Removes a prefix for the server",
        "<prefix: string>"
      ),
    });
  }
  async run(context: Context, args: RemovePrefixArgs) {
    const editor = new Prefixes(context);
    if (!editor.has(args.prefix)) {
      throw new Err("Prefix Not Found", { status: 404 });
    }
    editor.delete(args.prefix);
    return await context.editOrReply(
      `Removed ${Markup.codestring(args.prefix)} as a prefix`
    );
  }
}
