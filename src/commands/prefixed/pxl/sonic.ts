import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class PxlSonicCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl sonic",
      metadata: ImageMetadata("go fast", "<query: string>"),
      type: [
        {
          name: "text",
          type: "string",
          required: true,
          consume: true
        },
      ],
    });
  }

  run = Formatter.Pxl.sonic;
}
