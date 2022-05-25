import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class ImageSpinCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image spin",
      metadata: ImageMetadata(
        "you spin me right round baby right round like a record baby right round round round",
        "<target: Image>"
      ),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          required: true,
        },
      ],
    });
  }

  run = Formatter.Image.spin;
}
