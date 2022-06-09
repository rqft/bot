import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseImageCommand } from "../basecommand";

export default class ImageTiltCommand extends BaseImageCommand {
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
          name: "amount",
          type: Parameters.number({ min: 0, max: 90 }),
          required: false,
        },
      ],
    });
  }

  run = Formatter.Image.tilt;
}
