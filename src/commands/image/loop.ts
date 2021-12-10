import { Command } from "detritus-client";
import { CommandClient } from "detritus-client/lib/commandclient";
import gm from "gm";
import { createImageEmbed } from "../../functions/embed";
import { Parameters } from "../../functions/parameters";
import { BaseCommand } from "../basecommand";
export interface LoopArgs {
  image: Buffer;
  times: number;
}
export class LoopCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "loop",
      type: [
        { name: "image", type: Parameters.image, required: true },
        { name: "times", type: "number", default: 0 },
      ],
    });
  }
  async run(context: Command.Context, args: LoopArgs) {
    let value = Buffer.from([]);
    gm(args.image)
      .loop(args.times)
      .toBuffer((error, buffer) => {
        if (error) {
          context.reply("Error: " + error);
        }
        value = buffer;
      });

    let embed = await createImageEmbed(context, value, "loop");
    context.reply({ embed });
  }
}
