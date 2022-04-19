import { Command, CommandClient } from "detritus-client";
import { Image } from "imagescript";
import { SomeRandomAPI } from "pariah";
import { Brand } from "../../../enums/brands";
import { Converter } from "../../../functions/converter";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, storeImage } from "../../../functions/tools";
<<<<<<< HEAD
import {
  BaseCommand,
  ImageMetadata,
  ImageScriptAnimationArgs,
} from "../basecommand";
=======
import { BaseCommand, ImageMetadata, ImageScriptAnimationArgs } from "../basecommand";
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
export interface BloomArgs extends ImageScriptAnimationArgs {
  brightness: number;
}
export default class BloomCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "bloom",

      label: "animation",
      type: Parameters.ImageScript.animation,

      args: [
        { name: "brightness", type: "number", default: 1.5, required: true },
      ],
<<<<<<< HEAD
      metadata: ImageMetadata(
        "Applies a bloom effect on an image",
        "<image: Image> <-brightness: number=1.5>",
        ["insyri#7314", "insyri#7314 -brightness 0.5"]
      ),
=======
      metadata: ImageMetadata("Adds a bright/blurry effect to the image", "<animation: Image> ?<-brightness: number>")
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
    });
  }
  async run(context: Command.Context, args: BloomArgs) {
    let { animation } = args;
    for (let f of [...animation]) {
      const split1 = f.clone().lightness(args.brightness, false);
      let split2 = f.clone();

      // fuck this
      {
        const sra = new SomeRandomAPI();
        const buf = await split2.encode(undefined);
        const attach = await storeImage(
          Converter.Data.ArrayBuffer.toBuffer(buf),
          "attachment.gif"
        );
        const blurry = await sra.blur(attach.url!);
        const img = await Image.decode(
          Converter.Data.ArrayBuffer.toBuffer(blurry)
        );
        split2 = img;
      }
      f.composite(split1.opacity(0.2)).composite(split2.opacity(0.2));
    }

    const embed = await createImageEmbed(
      context,
      await Converter.ImageScript.Animation.toBuffer(animation),
      undefined,
      Brand.VYBOSE
    );
    return await editOrReply(context, { embed });
  }
}
