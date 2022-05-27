import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class InfoGuildCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "info guild",
      aliases: ['info server'],
      metadata: ToolsMetadata("guild info"),
    });
  }

  run = Formatter.Info.guild;
}
