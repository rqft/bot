"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeArrayDiff = void 0;
function makeArrayDiff(current, old) {
    return {
        added: current.filter((e) => !old.includes(e)).map((e) => `+ ${e}`),
        removed: old.filter((e) => !current.includes(e)).map((e) => `- ${e}`),
    };
}
exports.makeArrayDiff = makeArrayDiff;
