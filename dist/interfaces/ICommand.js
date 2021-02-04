"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCommandUsage = exports.parseArgument = void 0;
function parseArgument(arg) {
    const reqL = arg.required ? "<" : "[";
    const reqR = arg.required ? ">" : "]";
    return `${reqL}${arg.name}: ${arg.type}${reqR}`;
}
exports.parseArgument = parseArgument;
function makeCommandUsage(usedPrefix, command, args) {
    return `${usedPrefix}${command.name} ${args
        .map((e) => parseArgument(e))
        .join(" ")}`;
}
exports.makeCommandUsage = makeCommandUsage;
