import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseImageCommand } from "../basecommand";

export default class PxlEmojiMosaicCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl emojimosaic",
      aliases: ["pxl mosaic"],
      metadata: ImageMetadata(
        "emoji emoji emoji",
        "<target: Image> ?<-group-size: number=6> ?<-scale: boolean=true>"
      ),

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
        },
      ],
    });
  }

  run = Formatter.Pxl.emojiMosaic;
}
