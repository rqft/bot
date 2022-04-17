import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { SnapchatFilterType } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, storeImage } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageArgs } from "../basecommand";

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
