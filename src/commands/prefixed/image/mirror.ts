import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { APIs } from "pariah";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class ImageMirrorCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image mirror",
      metadata: ImageMetadata("mirror an image on itself", "<target: Image>"),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          required: true,
        },
      ],

      args: [
        {
          name: "method",
          type: "string",
          default: APIs.Jonathan.MirrorMethods.LEFT,
          choices: Object.values(APIs.Jonathan.MirrorMethods),
          required: false,
        },
      ],
    });
  }

  run = Formatter.Image.mirror;
}
