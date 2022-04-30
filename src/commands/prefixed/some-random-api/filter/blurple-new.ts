import { Command, CommandClient } from "detritus-client";
import { Filters, someRandomApiFilter } from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs, ImageMetadata } from "../../basecommand";

export default class SRABlurpleFilterCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "newblurple",

      label: "image",
      type: Parameters.image(),
      metadata: ImageMetadata("Blurple (post-rebrand) Filter"),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiFilter(
      context,
      args.image,
      Filters.BLURPLE_NEW,
      {}
    );
    return await editOrReply(context, { embed });
  }
}
