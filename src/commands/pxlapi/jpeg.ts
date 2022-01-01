import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { createImageEmbed } from "../../functions/embed";
import { Parameters } from "../../functions/parameters";
import { storeImage } from "../../functions/tools";
import { Secrets } from "../../secrets";
import { BaseCommand, ImageArgs } from "../basecommand";
export interface PxlJpegArgs extends ImageArgs {
  quality: number;
}
export default class PxlJpegCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "jpeg",

      label: "image",
      type: Parameters.image,

      args: [
        {
          name: "quality",
          type: "number",
          choices: [...Array(100).keys()].map((v) => v + 1),
          default: 1,
        },
      ],
    });
  }
  async run(context: Command.Context, args: PxlJpegArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);
    const imageAttach = await storeImage(args.image, "attachment.gif");
    const jpeg = await pxl.jpeg([imageAttach.url!], args.quality);
    const embed = await createImageEmbed(context, jpeg);

    return await context.editOrReply({ embed });
  }
}
