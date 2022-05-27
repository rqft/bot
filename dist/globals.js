"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KV = exports.interactions = exports.commands = exports.selfclient = exports.client = void 0;
const detritus_client_1 = require("detritus-client");
const wilson_kv_1 = require("wilson-kv");
const secrets_1 = require("./secrets");
const cache = {
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
exports.client = new detritus_client_1.ShardClient(secrets_1.Secrets.Token, {
    isBot: true,
    gateway: { loadAllMembers: true, intents: "ALL" },
    cache,
});
exports.selfclient = new detritus_client_1.ShardClient(secrets_1.Secrets.UserToken, {
    isBot: false,
});
exports.commands = new detritus_client_1.CommandClient(exports.client, {
    prefix: secrets_1.Secrets.DefaultPrefix,
    activateOnEdits: true,
});
exports.interactions = new detritus_client_1.InteractionCommandClient(exports.client, {
    checkCommands: true,
    strictCommandCheck: true,
});
var KV;
(function (KV) {
    KV.prefixes = new wilson_kv_1.Wilson("kv/prefixes");
    KV.tags = new wilson_kv_1.Wilson("kv/tags");
    KV.colors = new wilson_kv_1.Wilson("kv/colors");
    KV.mutes = new wilson_kv_1.Wilson("kv/mutes");
})(KV = exports.KV || (exports.KV = {}));
