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
      metadata: ImageMetadata("view funny colours", "<target: Image>"),
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
