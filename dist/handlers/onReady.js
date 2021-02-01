"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onReady = void 0;
const index_1 = require("../index");
const config_1 = require("../logs/config");
const leaveBlacklistedGuilds_1 = require("../logs/leaveBlacklistedGuilds");
function onReady() {
    return () => {
        leaveBlacklistedGuilds_1.leaveBlacklistedGuilds();
        index_1.client.user?.setActivity(config_1.config.bot.presence.activity.name, {
            name: "H",
            type: "STREAMING",
            url: "https://www.youtube.com/watch?v=db_sYdSPD24&ab_channel=FalseNoise-Topic",
        });
        console.log("Ready");
    };
}
exports.onReady = onReady;
