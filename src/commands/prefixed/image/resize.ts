import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class ImageResizeCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image resize",
      metadata: ImageMetadata("make small", "<target: Image> ?<size: string>", [
        "@insyri#7314 256x256",
        "insyri 256x",
        "insyri 2",
        "533757461706964993 x256",
      ]),
      type: [
        {
          name: "size",
          type: "string",
          required: false,
        },
      ],
    });
  }

  run = Formatter.Image.resize;
}
