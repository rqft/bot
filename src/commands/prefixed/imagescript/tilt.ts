import { Command, CommandClient } from "detritus-client";
import { Brand } from "../../../enums/brands";
import { Converter } from "../../../functions/converter";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand, ImageMetadata, ImageScriptAnimationArgs } from "../basecommand";
export interface TiltArgs extends ImageScriptAnimationArgs {
  amount: number;
}
export default class TiltCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tilt",

      label: "animation",
      type: Parameters.ImageScript.animation,

      args: [{ name: "amount", type: "number", default: 12, required: true }],
      metadata: ImageMetadata("Creates a tilt-blur effect on an image", "<image: Image> <-amount: number=12>")
    });
  }
  async run(context: Command.Context, args: TiltArgs) {
    let { animation } = args;
    for (let f of [...animation])
      for (let i = args.amount; i >= 0; i--)
        f.composite(f.clone().opacity(0.07).rotate(i, false));

    const embed = await createImageEmbed(
      context,
      await Converter.ImageScript.Animation.toBuffer(animation),
      undefined,
      Brand.VYBOSE
    );
    return await editOrReply(context, { embed });
  }
}
