import { Command, CommandClient } from "detritus-client";
import { Filters, someRandomApiFilter } from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs, ImageMetadata } from "../../basecommand";

export default class SRASepiaFilterCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "sepia",

      label: "image",
      type: Parameters.image(),
      metadata: ImageMetadata("Sepia Filter"),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiFilter(
      context,
      args.image,
      Filters.SEPIA,
      {}
    );
    return await editOrReply(context, { embed });
  }
}
