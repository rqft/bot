"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gcf = void 0;
function gcf(a, b) {
    if (!b) {
        return a;
    }
    return gcf(b, a % b);
}
exports.gcf = gcf;
