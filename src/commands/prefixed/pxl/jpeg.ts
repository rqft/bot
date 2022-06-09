import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class PxlJpegCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl jpeg",
      aliases: ["pxl jpg"],
      metadata: ImageMetadata("crunchy", "<target: Image> ?<-quality: number>"),

      args: [{ name: "quality", type: "number", required: false }],
    });
  }

  run = Formatter.Pxl.jpeg;
}
