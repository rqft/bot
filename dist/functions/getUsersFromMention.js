"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromMention = void 0;
const __1 = require("..");
function getUserFromMention(mention) {
    if (!mention)
        return;
    if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);
        if (mention.startsWith("!")) {
            mention = mention.slice(1);
        }
        return __1.client.users.cache.get(mention);
    }
}
exports.getUserFromMention = getUserFromMention;
