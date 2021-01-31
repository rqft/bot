"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_rpc_1 = __importDefault(require("discord-rpc"));
const discord_js_1 = __importDefault(require("discord.js"));
const fs_1 = __importDefault(require("fs"));
const process_1 = require("process");
const config_1 = require("./config");
const globals_1 = require("./globals");
exports.client = new discord_js_1.default.Client({
    ws: {
        properties: {
            $browser: config_1.config.bot.presence.browser,
        },
    },
});
const commands = new discord_js_1.default.Collection();
const commandFiles = fs_1.default
    .readdirSync(globals_1.path)
    .filter((file) => file.endsWith(".js"));
commandFiles.forEach((file) => {
    const command = require(`${globals_1.path}/${file}`);
    commands.set(command.name, command);
});
exports.client.once("ready", () => {
    exports.client.user?.setPresence({
        activity: {
            name: config_1.config.bot.presence.activity?.name,
            type: config_1.config.bot.presence.activity.type,
        },
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
    const command = commands.get(commandName) ||
        commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command)
        return;
    if (command.restrictions &&
        command.restrictions.ownerOnly &&
        !config_1.config.bot.ownerIds.includes(message.author.id))
        return message.reply("no");
    if (command.restrictions &&
        command.restrictions.guildOnly &&
        message.channel.type === "dm")
        return message.reply("I can't execute that command inside DMs!");
    if (command.usesArgs && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }
    try {
        command.run(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
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
