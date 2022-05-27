import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class EvalCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "eval",
      metadata: ToolsMetadata(
        "run code",
        "<code: string | Codeblock> <-json-spacing: number=2>"
      ),
      type: [
        {
          name: "code",
          type: "string",
          required: true,
          consume: true,
        },
      ],
    });
  }

  run = Formatter.code;
}
