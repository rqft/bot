import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class PxlAjitCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl ajit",
      metadata: ImageMetadata("overlays this guy onto an image", "<target: Image>"),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          default: Parameters.Default.imageUrl(ImageFormats.PNG),
        },
      ],
    });
  }

  run = Formatter.Pxl.ajit;
}
