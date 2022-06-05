import { CommandClient } from "detritus-client";

import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";

import { BaseCommand } from "../basecommand";

export default class SearchYoutubeCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "search youtube",
      aliases: ["search yt"],
      metadata: ToolsMetadata("look at mp4", "<query: string>"),
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

  run = Formatter.Search.youtube;
}
