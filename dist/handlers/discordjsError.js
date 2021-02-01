"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discordjsError = void 0;
const logError_1 = require("../logs/logError");
function discordjsError(err) {
    logError_1.logError(err);
}
exports.discordjsError = discordjsError;
