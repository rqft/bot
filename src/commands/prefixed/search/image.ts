import { CommandClient } from "detritus-client";

import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";

import { BaseCommand } from "../basecommand";

export default class SearchImageCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "search image",
      metadata: ToolsMetadata("look at png", "<query: string>", [
        "plants",
        "money",
      ]),
      type: [
        {
          name: "query",
          type: "string",
          consume: true,
          required: true,
        },
      ],
    });
  }

  run = Formatter.Search.image;
}
