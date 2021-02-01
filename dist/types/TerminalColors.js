"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = exports.TerminalColor = void 0;
var TerminalColor;
(function (TerminalColor) {
    TerminalColor.reset = "\u001b[0m";
})(TerminalColor = exports.TerminalColor || (exports.TerminalColor = {}));
function color(s, color) {
    return color + s + TerminalColor.reset;
}
exports.color = color;
