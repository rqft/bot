import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import { Filters, someRandomApiFilter } from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { BaseCommand, ImageArgs } from "../../basecommand";

export interface SRASepiaFilterArgs {
  user: User;
}

export default class SRASepiaFilterCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "sepia",

      label: "image",
      type: Parameters.image,
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiFilter(
      context,
      args.image,
      Filters.SEPIA,
      {}
    );
    return await context.editOrReply({ embed });
  }
}
