import { Command, CommandClient } from "detritus-client";
import { Frame, GIF } from "imagescript";
import { Brand } from "../../../enums/brands";
import { Converter } from "../../../functions/converter";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import {
  BaseCommand,
  ImageMetadata,
  ImageScriptFrameArgs,
} from "../basecommand";

export default class SpinCommand extends BaseCommand {
  expensive = true;
  constructor(client: CommandClient) {
    super(client, {
      name: "spin",

      label: "image",
      type: Parameters.ImageScript.frame,

      metadata: ImageMetadata("Makes an image spin"),
    });
  }
  async run(context: Command.Context, args: ImageScriptFrameArgs) {
    const { image } = args;

    const frames: Array<Frame> = [];

    for (let i = 0; i < 360; i += 15) {
      frames.push(
        Frame.from(
          image.clone().rotate(i, false),
          0,
          undefined,
          undefined,
          Frame.DISPOSAL_PREVIOUS
        )
      );
    }

    const gif = new GIF(frames);
    const embed = await createImageEmbed(
      context,
      await Converter.ImageScript.Animation.toBuffer(gif, 5),
      undefined,
      Brand.IMAGESCRIPT
    );
    return await editOrReply(context, { embed });
  }
}
