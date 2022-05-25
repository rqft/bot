"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.origin = void 0;
const result_1 = require("../models/result");
function origin(req, res) {
    (0, result_1.give)(res, {
        origin: req.ip,
    });
}
exports.origin = origin;
