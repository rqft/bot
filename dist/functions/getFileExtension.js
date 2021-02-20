"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtension = void 0;
function getFileExtension(url) {
    return url.split(".").pop();
}
exports.getFileExtension = getFileExtension;
