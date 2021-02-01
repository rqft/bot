"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatID = void 0;
function formatID(id, hide = true) {
    const spoiler = hide ? "||" : "";
    return `**[**${spoiler}\`${id}\`${spoiler}**]**`;
}
exports.formatID = formatID;
