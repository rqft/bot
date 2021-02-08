"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTimeString = void 0;
function parseTimeString(time) {
    const timeSuffix = {
        i: 1,
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
        w: 7 * 24 * 60 * 60 * 1000,
    };
    const TIME_REGEX = /(\d+)([ismhdw])/g;
    return Array.from(time.matchAll(TIME_REGEX)).reduce((p, [, num, suffix]) => p + parseInt(num, 10) * timeSuffix[suffix], 0);
}
exports.parseTimeString = parseTimeString;
