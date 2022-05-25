"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.give = void 0;
function give(res, data, status = { state: "ok", message: undefined, code: undefined }) {
    res.send({ data, status });
}
exports.give = give;
