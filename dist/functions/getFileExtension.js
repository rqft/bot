"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtension = void 0;
function getFileExtension(url) {
    const match = url.match(/\..{3,4}\?/g);
    if (!match)
        return "";
    return match[0]?.replace(/[\.\?]/g, "");
}
exports.getFileExtension = getFileExtension;
