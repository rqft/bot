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
import { Secrets } from "./secrets";

const cache: ShardClientCacheOptions = {
  users: true,
  guilds: true,
  channels: true,
  emojis: true,
  members: true,
  roles: true,
  interactions: true,
  messages: true,

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
  voiceStates: false,
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
