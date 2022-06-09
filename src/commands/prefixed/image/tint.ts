import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseImageCommand } from "../basecommand";

export default class ImageTintCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image tint",
      metadata: ImageMetadata(
        "make people have the funny colours",
        "<target: Image> <color: Color> ?<-[opacity|o]: 0-100=50>",
        [
          "@insyri#7314 f8f",
          "insyri f8f",
          "insyri f8f 50",
          "533757461706964993 f8f 25",
        ]
      ),
      type: [
        {
          name: "color",
          type: "string",
          required: true,
        },
      ],

      args: [
        {
          name: "opacity",
          type: Parameters.number({ min: 0, max: 100 }),
          required: false,
        },
      ],
    });
  }

  run = Formatter.Image.tint;
}
