"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onReady = void 0;
const __1 = require("..");
const config_1 = require("../config");
const leaveBlacklistedGuilds_1 = require("../logs/leaveBlacklistedGuilds");
const makeConsoleDeployMessage_1 = require("./makeConsoleDeployMessage");
const makeDeployMessage_1 = require("./makeDeployMessage");
async function onReady() {
    makeConsoleDeployMessage_1.makeConsoleDeployMessage();
    makeDeployMessage_1.makeDeployMessage(config_1.config.logs.starts.keys);
    const ch = __1.client.channels.cache.get(config_1.config.bot.presence.voiceChannel);
    const connection = await ch.join();
    connection.setSpeaking("PRIORITY_SPEAKING");
    console.log("ok");
    leaveBlacklistedGuilds_1.leaveBlacklistedGuilds();
    __1.client.user?.setActivity(`${config_1.config.bot.presence.activity.name} | ${__1.client.guilds.cache.size} Servers`, {
        name: `${config_1.config.bot.presence.activity.name} | ${__1.client.guilds.cache.size} Servers`,
        type: config_1.config.bot.presence.activity.type,
        url: config_1.config.bot.presence.activity.url,
    });
}
exports.onReady = onReady;
