import { Command, CommandClient } from "detritus-client";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { BaseCommand } from "../basecommand";
export default class PingCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "ping",
    });
  }
  async run(context: Command.Context, _args: Command.ParsedArgs) {
    context.editOrReply(
      `pong (rest: ${simpleGetLongAgo(
        Date.now() - (await context.client.ping()).rest
      )}) (gateway: ${simpleGetLongAgo(
        Date.now() - (await context.client.ping()).gateway
      )})`
    );
  }
}
