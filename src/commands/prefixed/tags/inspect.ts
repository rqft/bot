import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class TagInspectCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag inspect",
      aliases: ["t inspect"],
      metadata: ToolsMetadata("see tags file"),
    });
  }

  run = Formatter.Tag.inspect;
}
