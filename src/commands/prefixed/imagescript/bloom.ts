import { Command, CommandClient } from "detritus-client";
import { Image } from "imagescript";
import { SomeRandomAPI } from "pariah";
import { Brand } from "../../../enums/brands";
import { Converter } from "../../../functions/converter";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { storeImage } from "../../../functions/tools";
import { BaseCommand, ImageScriptAnimationArgs } from "../basecommand";
export interface BloomArgs extends ImageScriptAnimationArgs {
  brightness: number;
}
export default class BloomCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "bloom",

      label: "animation",
      type: Parameters.ImageScript.animation,
      required: true,

      args: [
        { name: "brightness", type: "number", default: 1.5, required: true },
      ],
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
    return await context.editOrReply({ embed });
  }
}
