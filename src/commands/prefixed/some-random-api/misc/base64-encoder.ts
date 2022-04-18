import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { SomeRandomAPI } from "pariah";
import { Brand } from "../../../../enums/brands";
import { createBrandEmbed } from "../../../../functions/embed";
import { Markup } from "../../../../functions/markup";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ToolsMetadata } from "../../basecommand";
export interface SRABase64EncodeArgs {
  text: string;
}
export default class SRABase64EncodeCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "base64 encode",

      label: "text",
      type: "string",
      required: true,
      metadata: ToolsMetadata("Encode text to base64", "<text: string>", [
        "hello world",
      ]),
    });
  }
  async run(context: Context, args: SRABase64EncodeArgs) {
    const { base64 } = await new SomeRandomAPI().base64Encode(args.text);

    const embed = createBrandEmbed(Brand.SOME_RANDOM_API, context);
    embed.setTitle("Base64 Encoding");
    embed.setDescription(Markup.codeblock(base64));
    return await editOrReply(context, { embed });
  }
}
