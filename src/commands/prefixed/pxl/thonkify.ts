import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class PxlThonkifyCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl thonkify",
      aliases: ['pxl thonk'],
      metadata: ImageMetadata("why", "<query: string>"),
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

  run = Formatter.Pxl.thonkify;
}
