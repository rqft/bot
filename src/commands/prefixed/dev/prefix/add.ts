import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { Markup } from "detritus-client/lib/utils";
import { Prefixes } from "../../../../functions/prefix";
import { BaseCommand, UtilityMetadata } from "../../basecommand";
export interface AddPrefixArgs {
  prefix: string;
}
export default class AddPrefixCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "prefix add",
      type: [{ name: "prefix", type: "string", required: true }],
      metadata: UtilityMetadata(
        "Adds a prefix for the server",
        "<prefix: string>"
      ),
    });
  }

  async run(context: Context, args: AddPrefixArgs) {
    const editor = new Prefixes(context);
    editor.add(args.prefix);
    return await context.editOrReply(
      `Added ${Markup.codestring(args.prefix)} as a prefix`
    );
  }
}
