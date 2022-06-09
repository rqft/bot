import { CommandClient } from "detritus-client";
import { CommandType, ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseImageCommand } from "../basecommand";

export default class InfoImageCommand extends BaseImageCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "info image",
      metadata: Object.assign(
        ImageMetadata("look at image data", "<target: Image>"),
        {
          category: CommandType.TOOLS,
        }
      ),
    });
  }

  run = Formatter.Info.image;
}
