import { CommandClient, ShardClient } from 'detritus-client/lib';
import { Secrets } from './secrets';

export const client = new ShardClient(Secrets.Token, {
  gateway: {
    intents: 3276799,
  },
  cache: true,
});
export const commands = new CommandClient(client, {
  prefix: Secrets.DefaultPrefix,
  activateOnEdits: true,
});

export const self = new ShardClient(Secrets.UserToken, {
  gateway: { intents: 3276799 },
  isBot: false,
  cache: true,
});
