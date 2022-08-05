import {
  CommandClient,
  InteractionCommandClient,
  ShardClient,
  ShardClientCacheOptions,
} from "detritus-client";
import {
  GatewayIntents,
  GATEWAY_INTENTS_ALL,
} from "detritus-client-socket/lib/constants";
import { BaseClientCollectionOptions } from "detritus-client/lib/collections";
import { Secrets } from "./secrets";
function cacher(limit: number, expire?: number): BaseClientCollectionOptions {
  return {
    limit,
    expire,
  };
}
const cache: ShardClientCacheOptions = {
  users: cacher(1e3),
  guilds: cacher(100),
  channels: cacher(1e3),
  emojis: cacher(1e4),
  members: cacher(Infinity),
  roles: cacher(1e3),
  interactions: cacher(Infinity),
  messages: cacher(Infinity),
  voiceStates: cacher(100),

  applications: false,
  connectedAccounts: false,
  guildScheduledEvents: false,
  notes: false,
  presences: false,
  relationships: false,
  sessions: false,
  stageInstances: false,
  stickers: false,
  typings: false,
  voiceCalls: false,
  voiceConnections: false,
};

export const client = new ShardClient(Secrets.Token, {
  // imageFormat: "gif",
  isBot: true,
  gateway: {
    loadAllMembers: true,
    intents: GATEWAY_INTENTS_ALL & ~GatewayIntents.GUILD_PRESENCES,
  },
  cache,
});

export const selfclient = new ShardClient(Secrets.UserToken, {
  isBot: false,
});

export const commands = new CommandClient(client, {
  prefix: Secrets.DefaultPrefix,
  activateOnEdits: true,
});

export const interactions = new InteractionCommandClient(client, {
  checkCommands: true,
  strictCommandCheck: true,
});
