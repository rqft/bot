"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandHandler = void 0;
const discord_js_1 = require("discord.js");
const config_1 = require("../config");
const capitalizeWords_1 = require("../functions/capitalizeWords");
const fetchCommand_1 = require("../functions/fetchCommand");
const logBlacklistedUserAction_1 = require("../logs/logBlacklistedUserAction");
const logCommandError_1 = require("../logs/logCommandError");
const logCommandUse_1 = require("../logs/logCommandUse");
const logError_1 = require("../logs/logError");
const cooldowns = new discord_js_1.Collection();
async function commandHandler(message) {
    const prefixRegex = new RegExp(`^(${config_1.config.bot.prefixes.join("|")})( ?)`, "gi");
    if (message.content.match(prefixRegex) == null)
        return;
    const prefix = message.content.match(prefixRegex).join("");
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = fetchCommand_1.fetchCommand(commandName);
    if (!command)
        return;
    if (config_1.config.blacklist.users.includes(message.author.id))
        return logBlacklistedUserAction_1.logBlacklistedUserAction(message);
    if (command.restrictions &&
        command.restrictions.ownerOnly &&
        !config_1.config.bot.ownerIds.includes(message.author.id))
        return message.channel.send(":lock: Missing Permissions; You need: `Bot Owner`");
    if (command.restrictions &&
        command.restrictions.serverOwnerOnly &&
        message.guild &&
        message.guild.ownerID !== message.author.id)
        return message.channel.send(":lock: Missing Permissions; You need: `Server Owner`");
    if (command.restrictions &&
        command.restrictions.permissions &&
        !message.member?.permissions.has(new discord_js_1.Permissions(command.restrictions.permissions), true))
        return message.channel.send(`:lock: Missing Permissions; You need: \`${command.restrictions.permissions
            .map((e) => capitalizeWords_1.capitalizeWords(e.toLowerCase().replace(/_/g, " ")))
            .join(", ")}\``);
    if (command.restrictions &&
        command.restrictions.guildOnly &&
        message.channel.type === "dm")
        return message.channel.send(":warning: I can't execute that command inside DMs!");
    if (command.usesArgs && !args.length)
        return message.channel.send(`:warning: Argument Error (missing argument)${command.usage
            ? `\n\`\`\`${prefix}${command.name} ${command.usage}\`\`\``
            : ""}`);
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new discord_js_1.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;
    if (timestamps.has(message.author.id) &&
        !config_1.config.bot.ownerIds.includes(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second${timeLeft == 1 ? "" : "s"} before reusing the \`${command.name}\` command.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    if (prefix.toLowerCase() == "p/" &&
        !config_1.config.bot.ownerIds.includes(message.author.id))
        return await message.channel.send(`:lock: The prefix \`p/\` is intended for dev use only. Use \`$${commandName}\` instead.`);
    try {
        logCommandUse_1.logCommandUse(message);
        command.run(message, args);
    }
    catch (error) {
        console.error(error);
        logCommandError_1.logCommandError(message, error);
        logError_1.logError({
            message: `${prefix}${command.name}`,
            name: "Command Error",
            stack: error.stack,
        });
        message.channel.send(`:no_entry: ${error}`);
    }
}
exports.commandHandler = commandHandler;
