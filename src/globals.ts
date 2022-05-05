import {
  CommandClient,
  InteractionCommandClient,
  ShardClient,
} from "detritus-client";
import { Wilson } from "wilson-kv";
import { Secrets } from "./secrets";

export const client = new ShardClient(Secrets.Token, {
  isBot: true,
  gateway: { loadAllMembers: true },
});

export const selfclient = new ShardClient(Secrets.UserToken, {
  isBot: false,
});

export const commands = new CommandClient(client, {
  onPrefixCheck: (context) => {
    if (context.guild) {
      const stored = KV.Prefixes.get<Array<string>>(context.guild.id);
      if (stored) {
        return stored;
      }
    }
    return Secrets.DefaultPrefix;
  },
});

export const interactions = new InteractionCommandClient(client, {
  checkCommands: true,
  strictCommandCheck: true,
});

export namespace KV {
  export const Prefixes = new Wilson("kv/prefixes");
}
