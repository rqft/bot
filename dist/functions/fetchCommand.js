"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCommand = void 0;
const __1 = require("..");
function fetchCommand(commandName) {
    commandName = commandName.toLowerCase();
    return (__1.commands.get(commandName) ||
        __1.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName)));
}
exports.fetchCommand = fetchCommand;
