"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandFiles = exports.commands = exports.client = void 0;
const discord_rpc_1 = __importDefault(require("discord-rpc"));
const discord_js_1 = __importDefault(require("discord.js"));
const fs_1 = __importDefault(require("fs"));
const process_1 = require("process");
const config_1 = require("./config");
const formatID_1 = require("./functions/formatID");
const globals_1 = require("./globals");
exports.client = new discord_js_1.default.Client({
    ws: {
        properties: {
            $browser: config_1.config.bot.presence.browser,
        },
    },
});
exports.commands = new discord_js_1.default.Collection();
exports.commandFiles = fs_1.default
    .readdirSync(globals_1.path)
    .filter((file) => file.endsWith(".js"));
exports.commandFiles.forEach((file) => {
    const command = require(`${globals_1.path}/${file}`);
    exports.commands.set(command.name, command);
});
exports.client.once("ready", () => {
    leaveBlacklistedGuilds();
    exports.client.user?.setActivity(config_1.config.bot.presence.activity.name, {
        name: "H",
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=db_sYdSPD24&ab_channel=FalseNoise-Topic",
    });
    console.log("Ready");
});
exports.client.on("message", async (message) => {
    const prefixRegex = new RegExp(`^(${config_1.config.bot.prefixes.join("|")})( ?)`, "gi");
    if (message.content.match(prefixRegex) == null)
        return;
    const prefix = message.content.match(prefixRegex).join("");
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = exports.commands.get(commandName) ||
        exports.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command)
        return;
    if (config_1.config.blacklist.users.includes(message.author.id)) {
        logBlacklistedUserAction(message);
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
        logCommandUse(message);
        command.run(message, args);
    }
    catch (error) {
        console.error(error);
        logCommandError(message, error);
        message.channel.send(`:warning: ${error}`);
    }
});
exports.client.login(config_1.config.bot.token);
const cc = new discord_rpc_1.default.Client({
    transport: "ipc",
});
cc.on("ready", () => {
    cc.request("SET_ACTIVITY", {
        pid: process_1.pid,
        activity: {
            assets: {
                large_image: "glasses",
            },
            buttons: [
                {
                    label: "<3",
                    url: "https://arcy-at.github.io/page/cutie",
                },
                {
                    label: "hi",
                    url: "https://discord.com/api/oauth2/authorize?client_id=760143615124439040&permissions=8&scope=bot",
                },
            ],
        },
    });
});
cc.login({ clientId: config_1.config.bot.application.clientId });
function logBlacklistedUserAction(message) {
    config_1.config.logs.blacklist.userBlocked.forEach((e) => {
        const ch = exports.client.channels.cache.get(e);
        const channelName = message.channel.type == "dm" ? "DMs" : message.channel;
        const guildName = message.guild ? `on \`${message.guild.name}\`` : "";
        ch.send(`:warning: Blacklisted User **${message.author.tag}** ${formatID_1.formatID(message.author.id)} tried to use command ${message.cleanContent} in ${channelName} ${formatID_1.formatID(message.channel.id)} ${guildName} ${message.guild ? formatID_1.formatID(message.guild.id) : ""}`);
    });
}
function logCommandError(message, error) {
    config_1.config.logs.commands.onError.keys.forEach((e) => {
        const ch = exports.client.channels.cache.get(e);
        const channelName = message.channel.type == "dm" ? "DMs" : message.channel;
        const guildName = message.guild ? `on \`${message.guild.name}\`` : "";
        ch.send(`:x: **${message.author.tag}** ${formatID_1.formatID(message.author.id)} tried to use command ${message.cleanContent} in ${channelName} ${formatID_1.formatID(message.channel.id)} ${guildName} ${message.guild ? formatID_1.formatID(message.guild.id) : ""} and caused an error.
\`\`\`ts
${error}
\`\`\``);
    });
}
function logCommandUse(message) {
    config_1.config.logs.commands.onError.keys.forEach((e) => {
        const ch = exports.client.channels.cache.get(e);
        const channelName = message.channel.type == "dm" ? "DMs" : message.channel;
        const guildName = message.guild ? `on \`${message.guild.name}\`` : "";
        ch.send(`:pencil: **${message.author.tag}** ${formatID_1.formatID(message.author.id)} used command ${message.cleanContent} in ${channelName} ${formatID_1.formatID(message.channel.id)} ${guildName} ${message.guild ? formatID_1.formatID(message.guild.id) : ""}`);
    });
}
function leaveBlacklistedGuilds() {
    config_1.config.blacklist.guild.ids.forEach((e) => {
        const g = exports.client.guilds.cache.get(e);
        if (g?.me) {
            g?.leave();
            logBlacklistedGuild(g);
        }
    });
    config_1.config.blacklist.guild.owners.forEach((e) => {
        const g = exports.client.guilds.cache.array().filter((guild) => guild.ownerID == e);
        g.forEach((h) => {
            if (h?.me) {
                h?.leave();
                logBlacklistedGuildOwner(h, h.owner.user);
            }
        });
    });
}
function logBlacklistedGuild(guild) {
    config_1.config.logs.blacklist.guildBlocked.forEach((e) => {
        const ch = exports.client.channels.cache.get(e);
        ch.send(`:warning: Blacklisted Guild \`${guild.name}\` ${formatID_1.formatID(guild.id)} tried to add the bot`);
    });
}
function logBlacklistedGuildOwner(guild, user) {
    config_1.config.logs.blacklist.guildBlocked.forEach((e) => {
        const ch = exports.client.channels.cache.get(e);
        ch.send(`:warning: Blacklisted Guild \`${guild.name}\` ${formatID_1.formatID(guild.id)} owned by **${user.tag}** tried to add the bot`);
    });
}
