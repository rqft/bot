import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class TagExecCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag exec",
      aliases: ["t exec", "tag eval", "t eval", "tag test", "t test"],
      metadata: ToolsMetadata(
        "exec tag script",
        "<script: string> ?<-args: Array<string>>"
      ),
      type: [
        {
          name: "script",
          type: "string",
          required: true,
        },
      ],

      args: [{ name: "args", type: Parameters.array(String), default: [] }],
    });
  }

  run = Formatter.Tag.exec;
}
