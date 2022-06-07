import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { APIs } from "pariah";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class ImageInvertCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image invert",
      metadata: ImageMetadata(
        "vignette",
        "<target: Image> <-method: InvertMethods=invert>",
        [
          "@insyri#7314",
          "insyri -method hue",
          "533757461706964993 -method value",
        ]
      ),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          required: true,
        },
      ],

      args: [
        {
          name: "method",
          aliases: ["m", "type", "t"],
          type: "string",
          choices: Object.values(APIs.Jonathan.InvertMethods),
          default: APIs.Jonathan.InvertMethods.INVERT,
          required: false,
        },
      ],
    });
  }

  run = Formatter.Image.invert;
}
