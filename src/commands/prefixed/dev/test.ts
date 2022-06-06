import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";

import { BaseCommand } from "../basecommand";

export default class TestCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "test",
      metadata: ToolsMetadata(
        "get tag",
        "<get: string> ?<-args: Array<string>>"
      ),
    });
  }

  run() {
    void 0;
  }
}
