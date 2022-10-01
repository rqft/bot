import { CommandClient, ShardClient } from "detritus-client/lib";
import { Secrets } from "./secrets";

export const client = new ShardClient(Secrets.Token, {
  gateway: {
    intents: 3276799,
  },
});
export const commands = new CommandClient(client, {
  prefix: ",",
  activateOnEdits: true,
});
