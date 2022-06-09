import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class ImageUpscaleCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "image upscale",
      aliases: ["image w2x"],
      metadata: ImageMetadata("make it huge", "<target: Image>", [
        "@insyri#7314",
        "insyri",
        "533757461706964993",
        "https://cdn.clancy.lol/turkey.png",
        "^",
      ]),
    });
  }

  run = Formatter.Image.upscale;
}
