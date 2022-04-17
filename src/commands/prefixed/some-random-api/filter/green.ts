import { Command, CommandClient } from "detritus-client";
import { Filters, someRandomApiFilter } from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs } from "../../basecommand";

export default class SRAGreenFilterCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "green",

      label: "image",
      type: Parameters.image(),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiFilter(
      context,
      args.image,
      Filters.GREEN,
      {}
    );
    return await editOrReply(context, { embed });
  }
}
