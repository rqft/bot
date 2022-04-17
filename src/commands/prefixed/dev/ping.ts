import { Command, CommandClient } from "detritus-client";
import { textPing } from "../../../functions/formatter";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand } from "../basecommand";

export default class PingCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "ping",
    });
  }
  async run(context: Command.Context, _args: {}) {
    await editOrReply(context, `ok pinging`);

    await editOrReply(context, await textPing());
  }
}
