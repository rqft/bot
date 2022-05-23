import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class ImaggaCategoriesCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "imagga categories",
      metadata: ImageMetadata(
        "what is this image",
        "<target: Image>"
      ),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          required: true,
        },
      ],
    });
  }

  run = Formatter.Imagga.categories;
}
