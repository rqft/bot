"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexes = exports.SpecialIDs = exports.Chars = exports.CMDFilesPath = exports.Color = void 0;
var Color;
(function (Color) {
    Color.embed = 3092790;
    Color.pylon = 4089312;
    Color.hallucinate = 10166000;
    Color.spotify = 1947988;
})(Color = exports.Color || (exports.Color = {}));
exports.CMDFilesPath = `${__dirname}\\commands`;
var Chars;
(function (Chars) {
    Chars["void"] = "\u200B";
})(Chars = exports.Chars || (exports.Chars = {}));
var SpecialIDs;
(function (SpecialIDs) {
    SpecialIDs["DISCORD"] = "643945264868098049";
    SpecialIDs["CLYDE"] = "1";
})(SpecialIDs = exports.SpecialIDs || (exports.SpecialIDs = {}));
exports.regexes = {
    sex: /s([^A-Z])*e([^A-Z])*x([^A-Z])*/gi,
};
