"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logBlacklistedUserAction = void 0;
const config_1 = require("../config");
const formatID_1 = require("../functions/formatID");
const index_1 = require("../index");
function logBlacklistedUserAction(message) {
    config_1.config.logs.blacklist.userBlocked.forEach((e) => {
        const ch = index_1.client.channels.cache.get(e);
        const channelName = message.channel.type == "dm" ? "DMs" : message.channel;
        const guildName = message.guild ? `on \`${message.guild.name}\`` : "";
        ch.send(`:warning: Blacklisted User **${message.author.tag}** ${formatID_1.formatID(message.author.id)} tried to use command \`${message.cleanContent}\` in ${channelName} ${formatID_1.formatID(message.channel.id)} ${guildName} ${message.guild ? formatID_1.formatID(message.guild.id) : ""}`);
    });
}
exports.logBlacklistedUserAction = logBlacklistedUserAction;
