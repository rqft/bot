"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = void 0;
const config_1 = require("../config");
const index_1 = require("../index");
function logError(error) {
    config_1.config.logs.commands.onError.keys.forEach((e) => {
        const ch = index_1.client.channels.cache.get(e);
        ch.send(`:x: Error: \`\`\`ts
${error}
\`\`\``);
    });
}
exports.logError = logError;
