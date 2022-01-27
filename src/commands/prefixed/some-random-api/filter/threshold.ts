import { Command, CommandClient } from "detritus-client";
import { Filters, someRandomApiFilter } from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { BaseCommand, ImageArgs } from "../../basecommand";

export interface SRAThresholdFilterArgs extends ImageArgs {
  threshold: number;
}

export default class SRAThresholdFilterCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "threshold",

      label: "image",
      type: Parameters.image(),

      args: [
        {
          name: "threshold",
          aliases: ["amount", "scale"],
          type: "number",
          default: 2,
        },
      ],
    });
  }
  async run(context: Command.Context, args: SRAThresholdFilterArgs) {
    const embed = await someRandomApiFilter(
      context,
      args.image,
      Filters.THRESHOLD,
      args
    );
    embed.setDescription(`Threshold: ${args.threshold}`);
    return await context.editOrReply({ embed });
  }
}
