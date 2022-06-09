import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class ImaggaTextCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "imagga text",
      metadata: ImageMetadata(
        "what is this image saying bro",
        "<target: Image>"
      ),
    });
  }

  run = Formatter.Imagga.readText;
}
