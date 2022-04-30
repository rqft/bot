import { Command, CommandClient } from "detritus-client";
import { APIs } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, storeImage } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageArgs, ImageMetadata } from "../basecommand";
export interface PxlJpegArgs extends ImageArgs {
  quality: number;
}
export default class PxlJpegCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "jpeg",

      label: "image",
      type: Parameters.image(),

      args: [
        {
          name: "quality",
          type: "number",
          choices: [...Array(100).keys()].map((v) => v + 1),
          default: 1,
        },
      ],
      metadata: ImageMetadata(
        "Worsen the quality of an Image",
        "<image: Image> <-quality: Range(1,100)=1>"
      ),
    });
  }
  async run(context: Command.Context, args: PxlJpegArgs) {
    const pxl = new APIs.PxlAPI.API(Secrets.Key.pxlAPI);
    const imageAttach = await storeImage(args.image, "attachment.gif");
    const jpeg = await pxl.jpeg([imageAttach.url!], args.quality);
    const embed = await createImageEmbed(
      context,
      jpeg,
      undefined,
      Brand.PXL_API
    );

    return await editOrReply(context, { embed });
  }
}
