"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCommandFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const globals_1 = require("../globals");
function fetchCommandFiles() {
    return fs_1.default.readdirSync(globals_1.CMDFilesPath).filter((file) => file.endsWith(".js"));
}
exports.fetchCommandFiles = fetchCommandFiles;
