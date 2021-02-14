"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandFiles = exports.commands = exports.client = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const config_1 = require("./config");
const commandHandler_1 = require("./handlers/commandHandler");
const discordjsError_1 = require("./handlers/discordjsError");
const fetchCommandFiles_1 = require("./handlers/fetchCommandFiles");
const makeCommandFromFile_1 = require("./handlers/makeCommandFromFile");
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
exports.commandFiles = fetchCommandFiles_1.fetchCommandFiles();
exports.commandFiles.forEach(makeCommandFromFile_1.makeCommands(exports.commands));
exports.client.once("ready", () => {
    onReady_1.onReady();
});
exports.client.on("error", (e) => discordjsError_1.discordjsError(e));
exports.client.on("message", async (message) => {
    await commandHandler_1.commandHandler(message);
});
exports.client.login(config_1.config.bot.token);
setUserPresence_1.setUserPresence();
