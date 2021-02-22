"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
module.exports = {
    name: "ping",
    usage: "",
    usesArgs: false,
    description: "get bot ping",
    async run(message) {
        const ret = await message.reply("<a:IconGui_Typing:798624244351107092>");
        await ret.delete();
        await message.reply(`Ping @${__1.client.ws.ping}ms; Message replied @${Date.now() - message.createdTimestamp}ms`);
    },
};
