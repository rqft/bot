import { Command, CommandClient } from "detritus-client";
import { altclients, client, selfclient } from "../../../globals";
import { BaseCommand } from "../basecommand";

export default class PingCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "ping",
    });
  }
  async run(context: Command.Context, _args: {}) {
    await context.editOrReply(`ok pinging`);
    const pings: Array<string> = [];
    for (let resty of [client, selfclient, ...altclients]) {
      const ping = await resty.ping();
      pings.push(
        `${emojiFromPing(ping.rest)} ${resty.user!.tag} (rest: ${
          ping.rest
        }ms, gateway: ${ping.gateway}ms)`
      );
    }
    await context.editOrReply(pings.join("\n"));
  }
}
function emojiFromPing(ping: number) {
  if (ping > 5000) return "❌";
  if (ping > 1000) return "💤"; // zzz
  if (ping > 500) return "⚠️";
  return "✅";
}
