import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../tools/command-metadata";
import { Formatter } from "../../tools/formatter";
import { BaseCommand } from "./basecommand";

export default class HelpCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "help",
      metadata: ToolsMetadata("get help", "?<query: string>", [
        "help",
        "search",
        "tag get",
      ]),

      type: [
        {
          name: "query",
          type: "string",
          required: false,
        },
      ],
    });
  }

  run = Formatter.help;
}
