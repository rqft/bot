"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandFiles = exports.commands = exports.client = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const config_1 = require("./config");
const formatID_1 = require("./functions/formatID");
const getLongAgo_1 = require("./functions/getLongAgo");
const commandHandler_1 = require("./handlers/commandHandler");
const discordjsError_1 = require("./handlers/discordjsError");
const fetchCommandFiles_1 = require("./handlers/fetchCommandFiles");
const makeCommandFromFile_1 = require("./handlers/makeCommandFromFile");
const onReady_1 = require("./handlers/onReady");
const setUserPresence_1 = require("./handlers/setUserPresence");
require("./logging-test");
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
    const sexes = message.content.match(/sex/gi);
    if (sexes) {
        if (message.author !== exports.client.user) {
            message.author.send(`No sex :bangbang:`);
            await message.react("😳");
        }
        config_1.config.global.sexAlarm.forEach(async (e) => {
            if (exports.client.user == message.author && message.channel.type == "dm")
                return;
            (await exports.client.channels.fetch(e))
                .send(`...`)
                .then((e) => e.edit(`${message.author} ${formatID_1.formatID(message.author.id)} has **sexed** __${sexes.length} time${sexes.length == 1 ? "" : "s"}__ in ${message.guild ? message.channel : "DMs"} ${formatID_1.formatID(message.channel.id)} ${message.guild && message.guild.id !== config_1.config.global.guildId
                ? `on \`${message.guild.name}\` ${formatID_1.formatID(message.guild.id)}`
                : ""}`));
        });
    }
    await commandHandler_1.commandHandler(message);
});
exports.client.login(config_1.config.bot.token);
setUserPresence_1.setUserPresence();
function tm() {
    return `\`[${new Date().toLocaleTimeString().replace(/[^\d:]/g, "")}]\``;
}
function getCh() {
    return exports.client.channels.cache.get(config_1.config.global.logging_test);
}
exports.client.on("ready", async () => {
    const ch = getCh();
    ch.send(`${tm()} ${"\uD83D\uDCE6"} ${ch.guild.me?.displayName} ${formatID_1.formatID(exports.client.user?.id)} is ready.`);
});
exports.client.on("error", async (text) => {
    const ch = getCh();
    ch.send(`${tm()} ${"\u26D4"} ${ch.guild.me?.displayName} ${formatID_1.formatID(exports.client.user?.id)} had an error.\`\`\`\n${text}\`\`\``);
});
exports.client.on("disconnect", async (unknown, other) => {
    const ch = getCh();
    ch.send(`${tm()} ${"\uD83D\uDD27"} ${ch.guild.me?.displayName} ${formatID_1.formatID(exports.client.user?.id)} was disconnected. (${other}) \`\`\`\n${unknown}\`\`\``);
});
exports.client.on("warn", async (warning) => {
    const ch = getCh();
    ch.send(`${tm()} ${"\u26A0\uFE0F"} ${ch.guild.me?.displayName} ${formatID_1.formatID(exports.client.user?.id)} sent a warning.\`\`\`\n${warning}\`\`\``);
});
exports.client.on("invalidated", () => {
    const ch = getCh();
    ch.send(`${tm()} ${"\u26D4"} ${ch.guild.me?.displayName} ${formatID_1.formatID(exports.client.user?.id)} was invalidated.`);
});
exports.client.on("rateLimit", (limit) => {
    const ch = getCh();
    ch.send(`${tm()} ${"\u26D4"} ${ch.guild.me?.displayName} ${formatID_1.formatID(exports.client.user?.id)} was ratelimited (limit: ${limit.limit}) on event \`${limit.method}\` for ${getLongAgo_1.simpleGetLongAgo(Date.now() - limit.timeout)}.
Path: https://discord.com/api${limit.path}
Time Difference: ${limit.timeDifference ?? 0}`);
});
