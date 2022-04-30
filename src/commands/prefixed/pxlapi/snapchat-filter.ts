import { Command, CommandClient } from "detritus-client";
import { APIs } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, storeImage } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageArgs, ImageMetadata } from "../basecommand";

export const snapchatFilters: Array<APIs.PxlAPI.SnapchatFilters> = [
  APIs.PxlAPI.SnapchatFilters.CLOWN,
  APIs.PxlAPI.SnapchatFilters.DOG,
  APIs.PxlAPI.SnapchatFilters.DOG2,
  APIs.PxlAPI.SnapchatFilters.DOG3,
  APIs.PxlAPI.SnapchatFilters.FLOWERS,
  APIs.PxlAPI.SnapchatFilters.PIG,
  APIs.PxlAPI.SnapchatFilters.RANDOM,
];
export interface PxlSnapchatFilterArgs extends ImageArgs {
  filter: typeof snapchatFilters[number];
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
        "Add a Snapchat filter",
        "<filter: string> <image: Image>",
        ["dog", "random insyri#7314"]
      ),
    });
  }
  async run(context: Command.Context, args: PxlSnapchatFilterArgs) {
    const pxl = new APIs.PxlAPI.API(Secrets.Key.pxlAPI);
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
