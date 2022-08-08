import { APIs } from "@rqft/fetch";
import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class ImageGenerateCommand extends BaseCommand {
  expensive = true;
  constructor(client: CommandClient) {
    super(client, {
      name: "image generate",
      metadata: ImageMetadata("ai", "<target: Image> <degrees: number>", [
        "avocado",
      ]),
      type: [
        {
          name: "query",
          type: "string",
          required: true,
        },
      ],
      args: [
        {
          name: "style",
          type: "string",
          choices: Object.keys(APIs.Jonathan.WomboStyles),
          default: "none",
        },
      ],
    });
  }

  run = Formatter.Image.generate;
}
