"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../functions/api");
const arrayToChunks_1 = require("../functions/arrayToChunks");
module.exports = {
    name: "cate",
    aliases: ["catpic"],
    usage: "",
    usesArgs: false,
    description: "cats!",
    async run(message, args) {
        const count = parseInt(args[0] ?? "1");
        const urls = [];
        for (let i = 0; i < count; i++) {
            urls.push((await api_1.api("http://aws.random.cat/meow", "json")).file);
        }
        const urlGroups = arrayToChunks_1.arrayToChunks(urls, 5);
        urlGroups.forEach((url) => {
            message.channel.send(url.join("\n"));
        });
    },
};
