import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../tools/command-metadata";
import { Formatter } from "../../tools/formatter";
import { BaseCommand } from "./basecommand";

export default class PingCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "invite",
      metadata: ToolsMetadata("add bot"),
    });
  }

  run = Formatter.invite;
}
