import { Command, CommandClient } from "detritus-client";
import { Filters, someRandomApiFilter } from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs, ImageMetadata } from "../../basecommand";

export interface SRAThresholdFilterArgs extends ImageArgs {
  threshold: number;
}

export default class SRAThresholdFilterCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "threshold",

      label: "image",
      type: Parameters.image("png"),

      args: [
        {
          name: "threshold",
          aliases: ["amount", "scale"],
          type: "number",
          default: 2,
        },
      ],
      metadata: ImageMetadata(
        "Creates a threshold filter",
        "<image: Image> ?<-[threshold|amount|scale]: number>"
      ),
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
    return await editOrReply(context, { embed });
  }
}
