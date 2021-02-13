"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const api_1 = require("../functions/api");
module.exports = {
    name: "api",
    usesArgs: true,
    usage: "<query: text>",
    async run(message, args) {
        const res = await api_1.api(`http://api.wolframalpha.com/v1/result?appid=${config_1.config.global.keys.wolframAlpha}&i=${encodeURIComponent(args.join(" "))}`, "text");
        await message.channel.send(`${res}

(Done in ${Date.now() - message.createdTimestamp}ms)`);
    },
};
