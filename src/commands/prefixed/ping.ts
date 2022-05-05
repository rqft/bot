import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { Permissions } from "detritus-client/lib/constants";
import { ToolsMetadata } from "../../tools/command-metadata";
import { BaseCommand } from "./basecommand";

export default class PingCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "ping",
      metadata: ToolsMetadata("pingy ping"),
      permissions: [Permissions.ADMINISTRATOR],
    });
  }

  async run(context: Context, _args: never) {
    return await context.editOrReply(
      `came back in ${Date.now() - this.createdAtUnix}ms`
    );
  }
}
