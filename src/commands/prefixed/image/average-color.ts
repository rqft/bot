import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class ImageSpinCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image average",
      metadata: ImageMetadata("blendy", "<target: Image>", [
        "@insyri#7314",
        "insyri",
        "533757461706964993",
      ]),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          required: true,
        },
      ],
    });
  }

  run = Formatter.Image.averageColor;
}
