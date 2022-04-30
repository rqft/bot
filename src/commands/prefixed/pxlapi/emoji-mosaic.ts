import { Command, CommandClient } from "detritus-client";
import { APIs } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, storeImage } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageArgs, ImageMetadata } from "../basecommand";
export interface PxlEmojiMosaicArgs extends ImageArgs {
  groupSize: number;
  scale: boolean;
}
export default class PxlEmojiMosaicCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "emoji-mosaic",
      aliases: ["emojimosaic", "emosaic"],

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
      metadata: ImageMetadata(
        "Creates an emoji mosaic from an image",
        "<image: Image> <-[groupSize|size|amount]: Range(6,100)=6> ?<-scale: boolean=false>"
      ),
    });
  }
  async run(context: Command.Context, args: PxlEmojiMosaicArgs) {
    const pxl = new APIs.PxlAPI.API(Secrets.Key.pxlAPI);
    const imageAttach = await storeImage(args.image, "attachment.gif");
    const emojiMosaic = await pxl.emojiMosaic(
      [imageAttach.url!],
      args.groupSize,
      args.scale
    );
    const embed = await createImageEmbed(
      context,
      emojiMosaic,
      undefined,
      Brand.PXL_API
    );

    return await editOrReply(context, { embed });
  }
}
