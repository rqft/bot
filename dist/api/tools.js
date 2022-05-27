"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeImage = exports.binary = exports.base64 = exports.ConversionMethods = void 0;
const imagescript_1 = require("imagescript");
var ConversionMethods;
(function (ConversionMethods) {
    ConversionMethods["ENCODE"] = "encode";
    ConversionMethods["DECODE"] = "decode";
})(ConversionMethods = exports.ConversionMethods || (exports.ConversionMethods = {}));
function base64(data, method) {
    switch (method) {
        case ConversionMethods.ENCODE:
            return Buffer.from(data).toString("base64");
        case ConversionMethods.DECODE:
            return Buffer.from(data, "base64").toString();
    }
}
exports.base64 = base64;
function binary(data, method) {
    switch (method) {
        case ConversionMethods.ENCODE:
            return data
                .split("")
                .map((c) => c.charCodeAt(0).toString(2))
                .join("");
        case ConversionMethods.DECODE:
            return data
                .split("")
                .map((c) => String.fromCharCode(parseInt(c, 2)))
                .join("");
    }
}
exports.binary = binary;
async function decodeImage(data) {
    const output = await (0, imagescript_1.decode)(data, true);
    if (output instanceof imagescript_1.GIF) {
        return output[0];
    }
    return output;
}
exports.decodeImage = decodeImage;
