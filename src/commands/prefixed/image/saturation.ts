import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseImageCommand } from "../basecommand";

export default class ImageBrightnessCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image saturation",
      metadata: ImageMetadata("crisp", "<target: Image> <amount: 0-100=50>", [
        "@insyri#7314",
        "insyri 50",
        "533757461706964993 25",
      ]),
      type: [
        {
          name: "amount",
          type: Parameters.number({ min: 0 }),
          required: false,
        },
      ],
    });
  }

  run = Formatter.Image.saturation;
}
