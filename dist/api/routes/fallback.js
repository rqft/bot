"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallback = void 0;
const error_1 = require("../models/error");
function fallback(req, res) {
    (0, error_1.stop)(res, 404, `Cannot ${req.method} ${req.path}`);
}
exports.fallback = fallback;
