import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class ImaggaTagsCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(
      client,
      {
        name: "imagga tags",
        metadata: ImageMetadata("what is this image", "<target: Image>"),
      },
      ImageFormats.PNG
    );
  }

  run = Formatter.Imagga.tags;
}
