import { Command, CommandClient } from "detritus-client";
import { textPing } from "../../../functions/formatter";
import { BaseCommand } from "../basecommand";

export default class PingCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "ping",
    });
  }
  async run(context: Command.Context, _args: {}) {
    await context.editOrReply(`ok pinging`);

    await context.editOrReply(await textPing());
  }
}
