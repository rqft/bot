import { Command, CommandClient } from "detritus-client";
import { textPing } from "../../../functions/formatter";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand, UtilityMetadata } from "../basecommand";

export default class PingCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "ping",
      metadata: UtilityMetadata("Ping the bots"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    await editOrReply(context, `ok pinging`);

    await editOrReply(context, await textPing());
  }
}
