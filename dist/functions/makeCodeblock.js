"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCodeblock = void 0;
function makeCodeblock(text, limit) {
    return text.length > limit ? `\`\`\`\n${text}\`\`\`` : `\`${text}\``;
}
exports.makeCodeblock = makeCodeblock;
