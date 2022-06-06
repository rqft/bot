import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class ImageTintCommand extends BaseCommand {
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
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          required: true,
        },
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
