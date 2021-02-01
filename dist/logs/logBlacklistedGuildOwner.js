"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logBlacklistedGuildOwner = void 0;
const config_1 = require("../config");
const formatID_1 = require("../functions/formatID");
const index_1 = require("../index");
function logBlacklistedGuildOwner(guild, user) {
    config_1.config.logs.blacklist.guildBlocked.forEach((e) => {
        const ch = index_1.client.channels.cache.get(e);
        ch.send(`:warning: Blacklisted Guild \`${guild.name}\` ${formatID_1.formatID(guild.id)} owned by **${user.tag}** tried to add the bot`);
    });
}
exports.logBlacklistedGuildOwner = logBlacklistedGuildOwner;
