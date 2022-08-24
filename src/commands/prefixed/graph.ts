import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../tools/command-metadata";
import { Formatter } from "../../tools/formatter";
import { Parameters } from "../../tools/parameters";
import { BaseCommand } from "./basecommand";

export default class PingCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "graph",
      aliases: ["plot"],
      metadata: ToolsMetadata("desmos"),
      args: [
        {
          name: "size",
          default: 512,
          type: Parameters.number({ min: 0, max: 2048 }),
        },
      ],
      type: [
        { name: "expr", required: true, type: Parameters.array(String, ";") },
      ],
    });
  }

  run = Formatter.graph;
}
