import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class ImaggaColorsCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "imagga colors",
      aliases: ["imagga color"],
      metadata: ImageMetadata(
        "what colors is this image of",
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

  run = Formatter.Imagga.colors;
}
