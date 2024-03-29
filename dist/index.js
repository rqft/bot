"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const constants_1 = require("./constants");
const globals_1 = require("./globals");
(async () => {
    constants_1.emojis.push(...(await (0, node_fetch_1.default)('https://raw.githubusercontent.com/abourtnik/emojis-world/master/scripts/emojis.json').then((x) => x.json())));
    console.log('waiting');
    const z = performance.now();
    globals_1.commands.addMultipleIn('./commands', { subdirectories: true });
    await globals_1.commands.run();
    console.log('ok!', performance.now() - z, 'ms');
    await globals_1.self.run();
})();
process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);
