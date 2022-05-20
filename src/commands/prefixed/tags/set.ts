import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class TagSetCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag set",
      aliases: [
        "t set",
        "tag add",
        "t add",
        "tag create",
        "t create",
        "tag edit",
        "t edit",
      ],
      type: [
        {
          name: "key",
          type: "string",
          required: true,
        },
        {
          name: "value",
          type: "string",
          consume: true,
        },
      ],
      metadata: ToolsMetadata("set a tag", "<key: string> <value: string>"),
    });
  }

  run = Formatter.Tag.post;
}
