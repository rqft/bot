import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { ToolsMetadata } from "../../tools/command-metadata";
import { editOrReply } from "../../tools/tools";
import { BaseCommand } from "./basecommand";

export default class PingCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "ping",
      metadata: ToolsMetadata("pingy ping"),
    });
  }

  async run(context: Context) {
    return editOrReply(context, "ok");
  }
}
