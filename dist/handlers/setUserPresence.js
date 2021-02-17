"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserPresence = void 0;
const discord_rpc_1 = __importDefault(require("discord-rpc"));
const config_1 = require("../config");
async function setUserPresence() {
    const RPCClient = new discord_rpc_1.default.Client({ transport: "ipc" });
    RPCClient.on("ready", () => {
        RPCClient.setActivity({
            joinSecret: "0000",
            instance: true,
            largeImageKey: "hallucinate",
            partyMax: 10,
            partySize: 2,
        });
    });
    RPCClient.login({
        clientId: config_1.config.bot.application.clientId,
    });
}
exports.setUserPresence = setUserPresence;
