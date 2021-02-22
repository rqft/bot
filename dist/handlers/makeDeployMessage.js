"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeployMessage = void 0;
const __1 = require("..");
const formatID_1 = require("../functions/formatID");
const formatTimestamp_1 = require("../functions/formatTimestamp");
function makeDeployMessage(pubChannels) {
    const message = [
        `${formatTimestamp_1.formatTimestamp(new Date())}`,
        `Logged in as ${__1.client.user?.tag} ${formatID_1.formatID(__1.client.user?.id)}`,
        "",
        `Fetching **${__1.client.guilds.cache.size}** guilds...`,
        __1.client.guilds.cache
            .array()
            .map((e) => `✅ \`Deployed to ${e.name.padEnd(40)}\` ${formatID_1.formatID(e.id)} (${__1.client.user}) (${`\`owned by ${e.owner?.user.tag}\``})`)
            .join("\n"),
        "",
        ":ballot_box_with_check: Ready!",
    ];
    pubChannels.forEach((e) => {
        const ch = __1.client.channels.cache.get(e);
        ch.send(message.join("\n"), { split: { char: "\n", prepend: "\u200b\n" } });
    });
}
exports.makeDeployMessage = makeDeployMessage;
