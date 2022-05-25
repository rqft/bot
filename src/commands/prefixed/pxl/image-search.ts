import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class PxlImageSearchCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl search image",
      metadata: ImageMetadata("why not just google it lol", "<query: string>"),
      type: [
        {
          name: "query",
          type: "string",
          required: true,
          consume: true
        },
      ],
    });
  }

  run = Formatter.Pxl.imageSearch;
}
