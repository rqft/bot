"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logBlacklistedGuild = void 0;
const formatID_1 = require("../functions/formatID");
const index_1 = require("../index");
const config_1 = require("./config");
function logBlacklistedGuild(guild) {
    config_1.config.logs.blacklist.guildBlocked.forEach((e) => {
        const ch = index_1.client.channels.cache.get(e);
        ch.send(`:warning: Blacklisted Guild \`${guild.name}\` ${formatID_1.formatID(guild.id)} tried to add the bot`);
    });
}
exports.logBlacklistedGuild = logBlacklistedGuild;
