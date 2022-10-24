"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = exports.commands = exports.client = void 0;
const lib_1 = require("detritus-client/lib");
const secrets_1 = require("./secrets");
exports.client = new lib_1.ShardClient(secrets_1.Secrets.Token, {
    gateway: {
        intents: 3276799,
    },
});
exports.commands = new lib_1.CommandClient(exports.client, {
    prefix: secrets_1.Secrets.DefaultPrefix,
    activateOnEdits: true,
});
exports.self = new lib_1.ShardClient(secrets_1.Secrets.UserToken, {
    gateway: { intents: 3276799 },
});
