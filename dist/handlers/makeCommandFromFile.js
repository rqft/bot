"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCommands = void 0;
const globals_1 = require("../globals");
function makeCommands(commands) {
    return (file) => {
        const command = require(`${globals_1.CMDFilesPath}/${file}`);
        commands.set(command.name, command);
    };
}
exports.makeCommands = makeCommands;
