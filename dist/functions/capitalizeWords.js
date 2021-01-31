"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeWords = void 0;
function capitalizeWords(s) {
    return s.replace(/(^|[ ])./g, (e) => e.toUpperCase());
}
exports.capitalizeWords = capitalizeWords;
