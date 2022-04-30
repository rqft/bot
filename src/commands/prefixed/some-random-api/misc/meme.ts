import { Command, CommandClient } from "detritus-client";
import { APIs } from "pariah";
import { Brand } from "../../../../enums/brands";
import { createBrandEmbed } from "../../../../functions/embed";
import { Markup } from "../../../../functions/markup";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, FunMetadata } from "../../basecommand";
export default class SRAMemeCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "meme",
      metadata: FunMetadata("Get a meme"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    const embed = createBrandEmbed(Brand.SOME_RANDOM_API, context);
    const sra = new APIs.SomeRandomApi.API();
    const { caption, image, category } = await sra.meme();

    embed.setDescription(`${category} meme`);
    embed.addField("Caption", Markup.codeblock(caption, { limit: 1000 }));
    embed.setImage(image);
    return await editOrReply(context, { embed });
  }
}
