"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onReady = void 0;
const config_1 = require("../config");
const index_1 = require("../index");
const leaveBlacklistedGuilds_1 = require("../logs/leaveBlacklistedGuilds");
const makeConsoleDeployMessage_1 = require("./makeConsoleDeployMessage");
const makeDeployMessage_1 = require("./makeDeployMessage");
function onReady() {
    makeConsoleDeployMessage_1.makeConsoleDeployMessage();
    makeDeployMessage_1.makeDeployMessage(config_1.config.logs.starts.keys);
    console.log("ok");
    leaveBlacklistedGuilds_1.leaveBlacklistedGuilds();
    index_1.client.user?.setActivity(config_1.config.bot.presence.activity.name, {
        name: "H",
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=db_sYdSPD24&ab_channel=FalseNoise-Topic",
    });
}
exports.onReady = onReady;
