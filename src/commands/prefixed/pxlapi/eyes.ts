import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { EyesType } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, storeImage } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageArgs, ImageMetadata } from "../basecommand";

export const eyesChoices: Array<EyesType> = [
  "big",
  "black",
  "bloodshot",
  "blue",
  "default",
  "googly",
  "green",
  "horror",
  "illuminati",
  "money",
  "pink",
  "red",
  "small",
  "spinner",
  "spongebob",
  "white",
  "yellow",
  "random",
];
export interface PxlEyesArgs extends ImageArgs {
  type: EyesType;
}
export default class PxlEyesCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "eyes",

      type: [
        { name: "image", type: Parameters.image() },
        {
          name: "type",
          type: "string",
          choices: eyesChoices,
          default: "default",
        },
      ],
<<<<<<< HEAD
      metadata: ImageMetadata(
        "Put funny eyes on an image",
        "<image: Image> <type: EyesType=default>",
        ["insyri#7314 big", "thowoee random"]
      ),
=======
      metadata: ImageMetadata("Apply eyes on top of some image", "<image: Image> ?<-type: EyesType>")
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
    });
  }
  async run(context: Command.Context, args: PxlEyesArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);
    const imageAttach = await storeImage(args.image, "attachment.gif");
    const eyes = await pxl.eyes([imageAttach.url!], args.type);
    const embed = await createImageEmbed(
      context,
      eyes,
      undefined,
      Brand.PXL_API
    );

    return await editOrReply(context, { embed });
  }
}
