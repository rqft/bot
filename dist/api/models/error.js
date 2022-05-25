"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = void 0;
const result_1 = require("./result");
function stop(res, code, message) {
    res.status(code);
    (0, result_1.give)(res, null, { state: "error", message, code });
}
exports.stop = stop;
