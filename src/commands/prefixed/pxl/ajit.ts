import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class PxlAjitCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl ajit",
      metadata: ImageMetadata(
        "overlays this guy onto an image",
        "<target: Image>"
      ),
    });
  }

  run = Formatter.Pxl.ajit;
}
