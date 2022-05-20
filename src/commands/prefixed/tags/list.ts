import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class TagListCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag list",
      aliases: ["t list", "tag ls", "t ls"],
      metadata: ToolsMetadata("list tags", "<key: string>"),
    });
  }

  run = Formatter.Tag.list;
}
