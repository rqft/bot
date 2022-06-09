import { CommandClient } from "detritus-client";
import { APIs } from "pariah";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class ImageMirrorCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image mirror",
      metadata: ImageMetadata(
        "mirror an image on itself",
        "<target: Image> <method: MirrorMethod=left>",
        ["insyri left", "@insyri#7314 right", "533757461706964993 top"]
      ),

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
