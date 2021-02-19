"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pullCodeFromBlock = void 0;
function pullCodeFromBlock(s) {
    return s.replace(/\`{3}\n?(.+)?\`{3}/g, "");
}
exports.pullCodeFromBlock = pullCodeFromBlock;
