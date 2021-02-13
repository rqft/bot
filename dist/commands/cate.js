"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../functions/api");
module.exports = {
    name: "cate",
    aliases: ["catpic"],
    async run(message, args) {
        const count = parseInt(args[0] ?? "1");
        const urls = [];
        for (let i = 0; i < count; i++) {
            urls.push((await api_1.api("http://aws.random.cat/meow", "json")).file);
        }
        await message.channel.send(urls.join("\n"), {
            split: {
                char: "\n",
            },
        });
    },
};
