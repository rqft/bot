import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class ImaggaTextCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(
      client,
      {
        name: "imagga text",
        metadata: ImageMetadata(
          "what is this image saying bro",
          "<target: Image>"
        ),
      },
      ImageFormats.PNG
    );
  }

  run = Formatter.Imagga.readText;
}
