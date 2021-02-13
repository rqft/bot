"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = void 0;
const config_1 = require("../config");
const formatTimestamp_1 = require("../functions/formatTimestamp");
const index_1 = require("../index");
function logError(error) {
    config_1.config.logs.commands.onError.keys.forEach((e) => {
        const ch = index_1.client.channels.cache.get(e);
        ch.send(`${formatTimestamp_1.formatTimestamp(new Date())} :no_entry: Error: \`\`\`ts
${error.name}: ${error.message}
Stack: \`${error.stack}\`
\`\`\``);
    });
}
exports.logError = logError;
