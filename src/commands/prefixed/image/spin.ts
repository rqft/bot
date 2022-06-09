import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class ImageSpinCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image spin",
      metadata: ImageMetadata(
        "you spin me right round baby right round like a record baby right round round round",
        "<target: Image>",
        ["@insyri#7314", "insyri", "533757461706964993"]
      ),
    });
  }

  run = Formatter.Image.spin;
}
