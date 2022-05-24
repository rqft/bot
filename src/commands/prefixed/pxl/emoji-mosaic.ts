import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class PxlEmojiMosaicCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl emojimosaic",
      aliases: ["pxl mosaic"],
      metadata: ImageMetadata(
        "emoji emoji emoji",
        "<target: Image> ?<-group-size: number=6> ?<-scale: boolean=true>"
      ),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          default: Parameters.Default.imageUrl(ImageFormats.PNG),
        },
      ],

      args: [
        {
          name: "group-size",
          aliases: ["size"],
          type: Parameters.number({ min: 6, max: 192 }),
          default: 6,
        },
        {
            name: "scale",
            type: "bool",
            default: true,
        }
      ],
    });
  }

  run = Formatter.Pxl.emojiMosaic;
}
