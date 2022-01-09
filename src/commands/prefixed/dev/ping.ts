import { Command, CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";

export default class PingCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "ping",
    });
  }
  async run(context: Command.Context, _args: {}) {
    return await context.editOrReply("ok pinged");
  }
}
