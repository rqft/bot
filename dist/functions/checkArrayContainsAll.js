"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayContainsAll = void 0;
function arrayContainsAll(arr, target) {
    return target.every((v) => arr.includes(v));
}
exports.arrayContainsAll = arrayContainsAll;
