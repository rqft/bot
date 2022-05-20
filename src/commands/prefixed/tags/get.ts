import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class TagGetCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag",
      aliases: ["t", "tag get", "t get"],
      priority: -1,
      metadata: ToolsMetadata(
        "get tag",
        "<get: string> ?<-args: Array<string>>"
      ),
      type: [
        {
          name: "key",
          type: "string",
          required: true,
        },
      ],

      args: [{ name: "args", type: Parameters.array(String), default: [] }],
    });
  }

  run = Formatter.Tag.get;
}
