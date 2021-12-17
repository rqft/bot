import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { SomeRandomAPI } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Markup } from "../../../functions/markup";
import { BaseCommand } from "../../basecommand";
export interface SRABase64EncodeArgs {
  text: string;
}
export default class SRABase64EncodeCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "encode",
      // subcommand
      prefix: "base64",

      label: "text",
      type: "string",
      required: true,
    });
  }
  async run(context: Context, args: SRABase64EncodeArgs) {
    const { base64 } = await new SomeRandomAPI().base64Encode(args.text);

    const embed = createBrandEmbed(Brand.SOME_RANDOM_API, context);
    embed.setTitle("Base64 Encoding");
    embed.setDescription(Markup.codeblock(base64));
  }
}
