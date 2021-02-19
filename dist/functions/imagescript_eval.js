"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_eval = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = require("../config");
async function is_eval(script, inject = {}) {
    const res = await node_fetch_1.default("https://fapi.wrmsr.io/image_script", {
        method: "POST",
        body: JSON.stringify({ args: { inject, text: script } }),
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${config_1.config.global.keys.fAPI}`,
        },
    });
    if (!res.ok)
        return [false, await res.text(), null];
    return [true, await res.buffer(), res.headers];
}
exports.is_eval = is_eval;
