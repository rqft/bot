import { CommandClient } from "detritus-client";

import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";

import { BaseCommand } from "../basecommand";

export default class SearchWebCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "search web",
      metadata: ToolsMetadata("look at html", "<query: string>"),
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

  run = Formatter.Search.web;
}
