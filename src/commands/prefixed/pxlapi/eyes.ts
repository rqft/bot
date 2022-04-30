import { Command, CommandClient } from "detritus-client";
import { APIs } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, storeImage } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageArgs, ImageMetadata } from "../basecommand";

export interface PxlEyesArgs extends ImageArgs {
  type: APIs.PxlAPI.Eyes;
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
          choices: Object.values(APIs.PxlAPI.Eyes),
          default: "default",
        },
      ],
      metadata: ImageMetadata(
        "Put funny eyes on an image",
        "<image: Image> <type: EyesType=default>",
        ["insyri#7314 big", "thowoee random"]
      ),
    });
  }
  async run(context: Command.Context, args: PxlEyesArgs) {
    const pxl = new APIs.PxlAPI.API(Secrets.Key.pxlAPI);
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
