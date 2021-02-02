"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../functions/api");
module.exports = {
    name: "cate",
    aliases: ["catpic"],
    async run(message) {
        await message.channel.send((await api_1.api("http://aws.random.cat/meow", "json")).file);
    },
};
