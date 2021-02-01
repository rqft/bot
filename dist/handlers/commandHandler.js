"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandHandler = void 0;
const index_1 = require("../index");
const config_1 = require("../logs/config");
const logBlacklistedUserAction_1 = require("../logs/logBlacklistedUserAction");
const logCommandError_1 = require("../logs/logCommandError");
const logCommandUse_1 = require("../logs/logCommandUse");
function commandHandler() {
    return async (message) => {
        const prefixRegex = new RegExp(`^(${config_1.config.bot.prefixes.join("|")})( ?)`, "gi");
        if (message.content.match(prefixRegex) == null)
            return;
        const prefix = message.content.match(prefixRegex).join("");
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = index_1.commands.get(commandName) ||
            index_1.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command)
            return;
        if (config_1.config.blacklist.users.includes(message.author.id)) {
            logBlacklistedUserAction_1.logBlacklistedUserAction(message);
            return;
        }
        if (command.restrictions &&
            command.restrictions.ownerOnly &&
            !config_1.config.bot.ownerIds.includes(message.author.id))
            return message.channel.send(":warning: Missing Permissions; You need: `Bot Owner`");
        if (command.restrictions &&
            command.restrictions.guildOnly &&
            message.channel.type === "dm")
            return message.channel.send(":warning: I can't execute that command inside DMs!");
        if (command.usesArgs && !args.length) {
            let reply = `:warning: You didn't provide any arguments;`;
            if (command.usage) {
                reply += ` The proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
        }
        try {
            logCommandUse_1.logCommandUse(message);
            command.run(message, args);
        }
        catch (error) {
            console.error(error);
            logCommandError_1.logCommandError(message, error);
            message.channel.send(`:warning: ${error}`);
        }
    };
}
exports.commandHandler = commandHandler;
