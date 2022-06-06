import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class ExecCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "exec",
      metadata: ToolsMetadata("run shell", "<code: string>", [
        "ls",
        "killall node",
      ]),
      type: [
        {
          name: "code",
          type: "string",
          required: true,
        },
      ],
    });
  }

  run = Formatter.exec;
}
