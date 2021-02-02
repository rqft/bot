"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.owoify = void 0;
function owoify(s) {
    return s.replace(/[lr]/g, "w").replace(/[LR]/g, "W");
}
exports.owoify = owoify;
