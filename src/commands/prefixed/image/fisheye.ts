import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class ImageFisheyeCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image fisheye",
      metadata: ImageMetadata(
        "vignette",
        "<target: Image> <amount: 0-100=50>",
        ["@insyri#7314", "insyri 50", "533757461706964993 25"]
      ),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          required: true,
        },
        {
          name: "amount",
          type: Parameters.number({ min: 0, max: 100 }),
          required: false,
        },
      ],
    });
  }

  run = Formatter.Image.fisheye;
}