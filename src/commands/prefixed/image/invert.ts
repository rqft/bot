import { APIs } from "@rqft/fetch";
import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class ImageInvertCommand extends BaseImageCommand {
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
