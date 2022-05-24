import {
  CommandClient,
  InteractionCommandClient,
  ShardClient,
  ShardClientCacheOptions
} from "detritus-client";
import { Wilson } from "wilson-kv";
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
  gateway: { loadAllMembers: true, intents: "ALL" },
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

export namespace KV {
  export const prefixes = new Wilson("kv/prefixes");
  export const tags = new Wilson("kv/tags");
}
