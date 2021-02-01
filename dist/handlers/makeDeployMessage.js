"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeployMessage = void 0;
const __1 = require("..");
const formatID_1 = require("../functions/formatID");
function makeDeployMessage(pubChannels) {
    const message = [
        `\u200b`,
        `Logged in as ${__1.client.user?.tag} ${formatID_1.formatID(__1.client.user?.id)}`,
        `\n`,
        `Fetching Guilds...`,
        __1.client.guilds.cache
            .array()
            .map((e) => `✅ Deployed to \`${e.name.padEnd(60)}\` ${formatID_1.formatID(e.id)} (${__1.client.user}) (${`\`owned by ${e.owner?.user.tag}\``})`)
            .join("\n"),
        "Ready!",
    ];
    pubChannels.forEach((e) => {
        const ch = __1.client.channels.cache.get(e);
        ch.send(message.join("\n"));
    });
}
exports.makeDeployMessage = makeDeployMessage;
