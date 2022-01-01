import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { createImageEmbed } from "../../functions/embed";
import { Parameters } from "../../functions/parameters";
import { storeImage } from "../../functions/tools";
import { Secrets } from "../../secrets";
import { BaseCommand, ImageArgs } from "../basecommand";

const one100 = [...Array(100 - 1).keys()].map((v) => v + 1);
export interface PxlGlitchArgs extends ImageArgs {
  iterations: number;
  amount: number;
  gifcount: number;
  delay: number;
}
export default class PxlGlitchCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "glitch",

      label: "image",
      type: Parameters.image,

      args: [
        { name: "iterations", type: "number", choices: one100, default: 10 },
        { name: "amount", type: "number", choices: one100, default: 5 },
        {
          name: "gifcount",
          type: "number",
          choices: [...Array(30).keys()].map((v) => v + 1),
          default: 10,
        },
        {
          name: "delay",
          type: "number",
          choices: [...Array(1000 - 1).keys()].map((v) => v + 1),
          default: 100,
        },
      ],
    });
  }
  async run(context: Command.Context, args: PxlGlitchArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);
    const imageAttach = await storeImage(args.image, "attachment.gif");
    const glitch = await pxl.glitch([imageAttach.url!], {
      amount: args.amount,
      gif: { count: args.gifcount, delay: args.delay },
      iterations: args.iterations,
    });
    const embed = await createImageEmbed(context, glitch);

    return await context.editOrReply({ embed });
  }
}
