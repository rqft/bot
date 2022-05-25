import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class PxlJpegCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl jpeg",
      aliases: ['pxl jpg'],
      metadata: ImageMetadata("crunchy", "<target: Image> ?<-quality: number>"),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          default: Parameters.Default.imageUrl(ImageFormats.PNG),
        },
      ],

      args: [{ name: "quality", type: "number", required: false }],
    });
  }

  run = Formatter.Pxl.jpeg;
}
