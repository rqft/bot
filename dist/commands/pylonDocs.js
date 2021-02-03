"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildDocsEmbed_1 = require("../functions/buildDocsEmbed");
module.exports = {
    name: "pylondocs",
    usage: "<query: string>",
    usesArgs: true,
    async run(message, args) {
        const resp = await buildDocsEmbed_1.lookup(args.join(" "), 0);
        await message.channel.send(buildDocsEmbed_1.buildDocsEmbed(resp, 15));
    },
};
