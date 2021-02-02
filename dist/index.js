"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandFiles = exports.commands = exports.client = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("./config");
const globals_1 = require("./globals");
const commandHandler_1 = require("./handlers/commandHandler");
const discordjsError_1 = require("./handlers/discordjsError");
const onReady_1 = require("./handlers/onReady");
const setUserPresence_1 = require("./handlers/setUserPresence");
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
    onReady_1.onReady();
});
exports.client.on("error", (err) => {
    discordjsError_1.discordjsError(err);
});
exports.client.on("message", (message) => {
    commandHandler_1.commandHandler(message);
});
exports.client.login(config_1.config.bot.token);
setUserPresence_1.setUserPresence();
