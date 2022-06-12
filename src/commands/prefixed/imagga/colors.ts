import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class ImaggaColorsCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(
      client,
      {
        name: "imagga colors",
        aliases: ["imagga color"],
        metadata: ImageMetadata(
          "what colors is this image of",
          "<target: Image>"
        ),
      },
      ImageFormats.PNG
    );
  }

  run = Formatter.Imagga.colors;
}
