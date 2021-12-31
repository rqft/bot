import { Command, CommandClient } from "detritus-client";
import { Filters, someRandomApiFilter } from "../../../functions/formatter";
import { Parameters } from "../../../functions/parameters";
import { BaseCommand, ImageArgs } from "../../basecommand";

export interface SRABrightnessFilterArgs extends ImageArgs {
  brightness: number;
}

export default class SRABrightnessFilterCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "brightness",

      label: "image",
      type: Parameters.image,

      args: [
        {
          name: "brightness",
          aliases: ["amount", "scale"],
          type: "number",
          default: 2,
        },
      ],
    });
  }
  async run(context: Command.Context, args: SRABrightnessFilterArgs) {
    const embed = await someRandomApiFilter(
      context,
      args.image,
      Filters.BRIGHTNESS,
      args
    );
    embed.setDescription(`Brightness: ${args.brightness}`);
    return await context.editOrReply({ embed });
  }
}
