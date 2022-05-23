import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class ImageMirrorCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image color",
      metadata: ImageMetadata("view funny colours", "<target: Image>"),
      type: [
        {
          name: "color",
          type: "string",
          required: true,
        },
      ],

      args: [
        {
          name: "size",
          type: "string",
          default: "512x512",
          required: false,
        },
      ],
    });
  }

  run = Formatter.Image.color;
}
