"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = require("../config");
const getUser_1 = require("../functions/getUser");
module.exports = {
    name: "api",
    usesArgs: true,
    restrictions: {
        ownerOnly: true,
    },
    usage: '<endpoint: string> <type: "user" | "url"> <thing: User | URL> [args: Object]',
    async run(message, args) {
        var url = null;
        switch (args[1]) {
            case "user":
                const user = (await getUser_1.getUser(message, args, false, 2)) ?? message.author;
                url =
                    user.avatarURL({ size: 1024, format: "png" }) ??
                        user.defaultAvatarURL;
                break;
            case "url":
                url = args[2];
                break;
            default:
                await message.channel.send("Invalid type. Valid types are: `url`, `user`");
        }
        const endpoint = args[0];
        const argument = args[3] ? args.slice(3).join(" ") : "{}";
        const baseURL = "https://fapi.wrmsr.io/" + endpoint;
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config_1.config.global.keys.fAPI}`,
        };
        const body = {
            images: [url],
            args: JSON.parse(argument),
        };
        const fAPI = await node_fetch_1.default(baseURL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });
        if (!fAPI.ok)
            return await message.channel.send(`There was an error (code ${fAPI.status}). \`\`\`diff\n${fAPI.statusText
                .split("\n")
                .map((e) => `- ${e}`)}\n\`\`\``);
        await message.channel.send(``, {
            files: [
                {
                    name: "hi.png",
                    attachment: await fAPI.buffer(),
                },
            ],
        });
    },
};
