"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveBlacklistedGuilds = void 0;
const config_1 = require("../config");
const index_1 = require("../index");
const logBlacklistedGuild_1 = require("./logBlacklistedGuild");
const logBlacklistedGuildOwner_1 = require("./logBlacklistedGuildOwner");
function leaveBlacklistedGuilds() {
    config_1.config.blacklist.guild.ids.forEach((e) => {
        const g = index_1.client.guilds.cache.get(e);
        if (g?.me) {
            g?.leave();
            logBlacklistedGuild_1.logBlacklistedGuild(g);
        }
    });
    config_1.config.blacklist.guild.owners.forEach((e) => {
        const g = index_1.client.guilds.cache.array().filter((guild) => guild.ownerID == e);
        g.forEach((h) => {
            if (h?.me) {
                h?.leave();
                logBlacklistedGuildOwner_1.logBlacklistedGuildOwner(h, h.owner.user);
            }
        });
    });
}
exports.leaveBlacklistedGuilds = leaveBlacklistedGuilds;
