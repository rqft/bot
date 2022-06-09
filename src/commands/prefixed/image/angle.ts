import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class ImageRotateCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image rotate",
      metadata: ImageMetadata("turn", "<target: Image> <degrees: number>", [
        "@insyri#7314 90",
        "insyri 45",
        "533757461706964993 120",
      ]),
      type: [
        {
          name: "degrees",
          type: "number",
          required: true,
        },
      ],
    });
  }

  run = Formatter.Image.rotate;
}
