"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
async function api(url, type = "json") {
    const fetched = await node_fetch_1.default(url);
    switch (type) {
        case "arrayBuffer":
            return await fetched.arrayBuffer();
        case "buffer":
            return await fetched.buffer();
        case "json":
            return await fetched.json();
        case "text":
            return await fetched.text();
    }
}
exports.api = api;
