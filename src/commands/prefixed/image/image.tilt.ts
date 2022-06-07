import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class ImageTiltCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image tilt",
      metadata: ImageMetadata(
        "blurry spinny",
        "<target: Image> ?<amount: number>",
        [
          "@insyri#7314",
          "insyri",
          "insyri -amount 12",
          "533757461706964993 -amount 7",
        ]
      ),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          required: true,
        },
        {
          name: "amount",
          type: Parameters.number({ min: 0, max: 90 }),
          required: false,
        },
      ],
    });
  }

  run = Formatter.Image.tilt;
}
