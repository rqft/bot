"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logCommandError = void 0;
const formatID_1 = require("../functions/formatID");
const index_1 = require("../index");
const config_1 = require("./config");
function logCommandError(message, error) {
    config_1.config.logs.commands.onError.keys.forEach((e) => {
        const ch = index_1.client.channels.cache.get(e);
        const channelName = message.channel.type == "dm" ? "DMs" : message.channel;
        const guildName = message.guild ? `on \`${message.guild.name}\`` : "";
        ch.send(`:x: **${message.author.tag}** ${formatID_1.formatID(message.author.id)} tried to use command \`${message.cleanContent}\` in ${channelName} ${formatID_1.formatID(message.channel.id)} ${guildName} ${message.guild ? formatID_1.formatID(message.guild.id) : ""} and caused an error.
\`\`\`ts
${error}
\`\`\``);
    });
}
exports.logCommandError = logCommandError;
