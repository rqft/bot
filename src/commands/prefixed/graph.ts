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
      metadata: ToolsMetadata(
        "desmos",
        "<expr: string> ?<-[size|s]: number> <-[splot|thickness|t|sp]: number> ?<-[scale|scalar]: number>"
      ),
      args: [
        {
          name: "size",
          aliases: ["s"],
          default: 512,
          type: Parameters.number({ min: 0, max: 2048 }),
        },
        {
          name: "splot",
          aliases: ["thickness", "t", "sp"],
          default: 1,
          type: Parameters.number({ min: 0, max: 10 }),
        },
        {
          name: "scale",
          aliases: ["scalar"],
          default: 10,
          type: Parameters.number(),
        },
      ],
      type: [{ name: "expr", required: true, type: String }],
    });
  }

  run = Formatter.Image.graph;
}
