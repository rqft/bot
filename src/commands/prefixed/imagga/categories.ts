import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class ImaggaCategoriesCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "imagga categories",
      metadata: ImageMetadata("what is this image", "<target: Image>"),
    });
  }

  run = Formatter.Imagga.categories;
}
