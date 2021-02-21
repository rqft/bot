"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
function random(source) {
    return source[~~(Math.random() * source.length)];
}
exports.random = random;
