import { CommandClient } from "detritus-client";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class PxlWebSearchCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl search web",
      aliases: ["pxl search"],
      priority: 2,
      metadata: ImageMetadata("why not just google it lol", "<query: string>"),
      type: [
        {
          name: "query",
          type: "string",
          required: true,
          consume: true,
        },
      ],
    });
  }

  run = Formatter.Pxl.webSearch;
}
