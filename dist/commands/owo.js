"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const owoify_1 = require("../functions/owoify");
module.exports = {
    name: "owo",
    usesArgs: true,
    description: "owowowowowowowowowowo",
    aliases: ["uwu", "owoify", "uwuify"],
    usage: "<text: string>",
    async run(message, args) {
        await message.channel.send(owoify_1.owoify(args.join(" ")));
    },
};
