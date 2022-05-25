"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64Decode = void 0;
const error_1 = require("../models/error");
const result_1 = require("../models/result");
const tools_1 = require("../tools");
function base64Decode(req, res) {
    const text = req.query.text;
    if (text) {
        (0, result_1.give)(res, (0, tools_1.base64)(text, tools_1.ConversionMethods.DECODE));
    }
    else {
        (0, error_1.stop)(res, 400, "No text provided");
    }
}
exports.base64Decode = base64Decode;
