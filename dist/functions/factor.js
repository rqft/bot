"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factor = void 0;
const api_1 = require("./api");
async function factor(query) {
    const url = "https://newton.now.sh/api/v2/factor/";
    return (await api_1.api(url + encodeURIComponent(query))).result;
}
exports.factor = factor;
