"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactions = exports.commands = exports.selfclient = exports.client = void 0;
const detritus_client_1 = require("detritus-client");
const constants_1 = require("detritus-client-socket/lib/constants");
const secrets_1 = require("./secrets");
function cacher(limit, expire) {
    return {
        limit,
        expire,
    };
}
const cache = {
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
exports.client = new detritus_client_1.ShardClient(secrets_1.Secrets.Token, {
    isBot: true,
    gateway: {
        loadAllMembers: true,
        intents: constants_1.GATEWAY_INTENTS_ALL & ~constants_1.GatewayIntents.GUILD_PRESENCES,
    },
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
