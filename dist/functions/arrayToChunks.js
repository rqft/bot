"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayToChunks = void 0;
function arrayToChunks(array, chunk_size) {
    return (Array(Math.ceil(array.length / chunk_size))
        .fill()
        .map((_, index) => index * chunk_size)
        .map((begin) => array.slice(begin, begin + chunk_size)));
}
exports.arrayToChunks = arrayToChunks;
