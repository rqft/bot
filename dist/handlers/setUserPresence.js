"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserPresence = void 0;
const discord_rpc_1 = __importDefault(require("discord-rpc"));
const process_1 = require("process");
const config_1 = require("../logs/config");
function setUserPresence() {
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
}
exports.setUserPresence = setUserPresence;
