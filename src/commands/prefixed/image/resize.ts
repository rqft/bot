import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class ImageResizeCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image resize",
      metadata: ImageMetadata("make small", "<target: Image> ?<size: string>"),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          required: true,
        },
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
