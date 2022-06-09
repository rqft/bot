import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class ImaggaColorsCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "imagga colors",
      aliases: ["imagga color"],
      metadata: ImageMetadata(
        "what colors is this image of",
        "<target: Image>"
      ),
    });
  }

  run = Formatter.Imagga.colors;
}
