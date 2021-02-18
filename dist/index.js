"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeServerSlashCommand = exports.commandFiles = exports.commands = exports.client = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const config_1 = require("./config");
const formatID_1 = require("./functions/formatID");
const globals_1 = require("./globals");
const commandHandler_1 = require("./handlers/commandHandler");
const discordjsError_1 = require("./handlers/discordjsError");
const fetchCommandFiles_1 = require("./handlers/fetchCommandFiles");
const makeCommandFromFile_1 = require("./handlers/makeCommandFromFile");
const onReady_1 = require("./handlers/onReady");
const setUserPresence_1 = require("./handlers/setUserPresence");
require("./logging-test");
setUserPresence_1.setUserPresence();
exports.client = new discord_js_1.default.Client({
    ws: {
        properties: {
            $browser: config_1.config.bot.presence.browser,
        },
    },
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        roles: [],
        users: [],
    },
});
console.log(globals_1.CMDFilesPath);
exports.commands = new discord_js_1.default.Collection();
exports.commandFiles = fetchCommandFiles_1.fetchCommandFiles();
exports.commandFiles.forEach(makeCommandFromFile_1.makeCommands(exports.commands));
async function makeServerSlashCommand(id = config_1.config.global.mainServerID, data, response) {
    const interaction = exports.client.api
        .applications(exports.client.user?.id)
        .guilds(id)
        .commands.post({
        data: data,
    });
    exports.client.ws.on("INTERACTION_CREATE", async (interaction) => {
        exports.client.api.interactions(interaction.id, interaction.token).callback.post({
            data: response,
        });
    });
}
exports.makeServerSlashCommand = makeServerSlashCommand;
exports.client.once("ready", async () => {
    onReady_1.onReady();
});
exports.client.on("error", (e) => discordjsError_1.discordjsError(e));
exports.client.on("message", async (message) => {
    const sexes = message.content.match(/sex/gi);
    if (sexes) {
        if (message.author !== exports.client.user) {
            try {
                message.author.send(`No sex :bangbang:`);
            }
            catch (e) { }
            await message.react("😳");
        }
        config_1.config.global.sexAlarm.forEach(async (e) => {
            if (exports.client.user == message.author && message.channel.type == "dm")
                return;
            (await exports.client.channels.fetch(e))
                .send(`...`)
                .then((e) => e.edit(`${message.author} ${formatID_1.formatID(message.author.id)} has **sexed** __${sexes.length} time${sexes.length == 1 ? "" : "s"}__ in ${message.guild ? message.channel : "DMs"} ${formatID_1.formatID(message.channel.id)} ${message.guild && message.guild.id !== config_1.config.global.mainServerID
                ? `on \`${message.guild.name}\` ${formatID_1.formatID(message.guild.id)}`
                : ""}`));
        });
    }
    await commandHandler_1.commandHandler(message);
});
exports.client.login(config_1.config.bot.token);
exports.client.on("guildCreate", () => exports.client.emit("ready"));
