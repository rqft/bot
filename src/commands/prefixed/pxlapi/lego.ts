import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, storeImage } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageArgs, ImageMetadata } from "../basecommand";
export interface PxlLegoArgs extends ImageArgs {
  groupSize: number;
  scale: boolean;
}
export default class PxlLegoCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "lego",
      aliases: ["legoify"],

      label: "image",
      type: Parameters.image(),

      args: [
        {
          name: "groupSize",
          aliases: ["size", "amount"],
          type: "number",
          choices: [...Array(100 - 5).keys()].map((v) => v + 6),
          default: 6,
        },
        { name: "scale", type: "bool", default: false, required: false },
      ],
<<<<<<< HEAD
      metadata: ImageMetadata(
        "Legoify an image",
        "<image: Image> <-[groupSize|size|amount]: Range(6,100)=6> ?<-scale: boolean=false>"
      ),
=======
      metadata: ImageMetadata("Legoify an image", "<image: Image> ?<-[groupSize|size|amount]: Range(6,100)>")
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
    });
  }
  async run(context: Command.Context, args: PxlLegoArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);
    const imageAttach = await storeImage(args.image, "attachment.gif");
    const lego = await pxl.lego([imageAttach.url!], {
      scale: args.scale,
      groupSize: args.groupSize,
    });
    const embed = await createImageEmbed(
      context,
      lego,
      undefined,
      Brand.PXL_API
    );

    return await editOrReply(context, { embed });
  }
}
