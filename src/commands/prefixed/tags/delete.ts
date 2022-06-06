import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class TagDeleteCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag delete",
      aliases: ["t delete", "tag remove", "t remove"],
      metadata: ToolsMetadata("delete tag", "<key: string>", ["jonathan"]),
      type: [
        {
          name: "key",
          type: "string",
          required: true,
        },
      ],
    });
  }

  run = Formatter.Tag.remove;
}
