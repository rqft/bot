import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { SnapchatFilterType } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, storeImage } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageArgs, ImageMetadata } from "../basecommand";

export const snapchatFilters: Array<SnapchatFilterType> = [
  "dog",
  "dog2",
  "dog3",
  "pig",
  "flowers",
  "clown",
  "random",
];
export interface PxlSnapchatFilterArgs extends ImageArgs {
  filter: SnapchatFilterType;
}
export default class PxlSnapchatFilterCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "snapchat",
      type: [
        {
          name: "filter",
          type: "string",
          choices: snapchatFilters,
          default: "default",
        },
        {
          name: "image",
          type: Parameters.image(),
        },
      ],
      metadata: ImageMetadata(
        "Apply a snapchat filter onto an image",
        "<filter: dog|dog2|dog3|pig|flowers|clown|random> <image: Image>",
        ["dog insyri", "random insyri#7314"]
      ),
    });
  }
  async run(context: Command.Context, args: PxlSnapchatFilterArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);
    const imageAttach = await storeImage(args.image, "attachment.gif");
    const snapchat = await pxl.snapchat([imageAttach.url!], args.filter);
    const embed = await createImageEmbed(
      context,
      snapchat,
      undefined,
      Brand.PXL_API
    );

    return await editOrReply(context, { embed });
  }
}
