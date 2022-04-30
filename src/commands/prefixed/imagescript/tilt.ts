import { Command, CommandClient } from "detritus-client";
import { Brand } from "../../../enums/brands";
import { Converter } from "../../../functions/converter";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import {
  BaseCommand,
  ImageMetadata,
  ImageScriptAnimationArgs,
} from "../basecommand";
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
      metadata: ImageMetadata(
        "Applies a tilt-blur effect on an image",
        "<image: Image> <-amount: number=12>",
        ["insyri#7314", "insyri#7314 -amount 8"]
      ),
    });
  }
  async run(context: Command.Context, args: TiltArgs) {
    let { animation } = args;
    for (let frame of Array.from(animation)) {
      for (let degrees = args.amount; degrees >= 0; degrees--) {
        const clone = frame.clone();
        clone.opacity(0.07);
        clone.rotate(degrees, false);
        frame.composite(clone);
      }
    }
    const embed = await createImageEmbed(
      context,
      await Converter.ImageScript.Animation.toBuffer(animation),
      undefined,
      Brand.IMAGESCRIPT
    );
    return await editOrReply(context, { embed });
  }
}
