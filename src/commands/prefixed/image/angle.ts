import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class ImageRotateCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image rotate",
      metadata: ImageMetadata("turn", "<target: Image> ?<degrees: number>"),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          required: true,
        },
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
