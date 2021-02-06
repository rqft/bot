"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
module.exports = {
    name: "test",
    async run(message, args) {
        const query = args.join(" ");
        const def = await (await node_fetch_1.default(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${query}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                "x-rapidapi-key": "a9fb0095e3msh7092e19dd0034e9p1261a5jsnb924703f4137",
            },
        })).json();
        await message.channel.send(JSON.stringify(def, null, "\t"), {
            code: "json",
        });
    },
};
