import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class ImageUpscaleCommand extends BaseCommand {
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
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(),
          required: true,
        },
      ],
    });
  }

  run = Formatter.Image.upscale;
}
