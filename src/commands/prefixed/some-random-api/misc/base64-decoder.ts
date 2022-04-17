import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { SomeRandomAPI } from "pariah";
import { Brand } from "../../../../enums/brands";
import { createBrandEmbed } from "../../../../functions/embed";
import { Markup } from "../../../../functions/markup";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand } from "../../basecommand";
export interface SRABase64DecodeArgs {
  text: string;
}
export default class SRABase64DecodeCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "decode",
      // subcommand
      prefix: "base64 ",

      label: "text",
      type: "string",
      required: true,
    });
  }
  async run(context: Context, args: SRABase64DecodeArgs) {
    const { text } = await new SomeRandomAPI().base64Decode(args.text);

    const embed = createBrandEmbed(Brand.SOME_RANDOM_API, context);
    embed.setTitle("Base64 Decoding");
    embed.setDescription(Markup.codeblock(text));
    return await editOrReply(context, { embed });
  }
}
