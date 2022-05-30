"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRotate = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const error_1 = require("../models/error");
const tools_1 = require("../tools");
async function imageRotate(req, res) {
    const url = req.query.url;
    const deg = Number.parseInt(req.params.deg || "0");
    if (Number.isNaN(deg)) {
        (0, error_1.stop)(res, 400, "No angle provided");
        return;
    }
    if (url) {
        const request = await (0, node_fetch_1.default)(url);
        const data = await request.buffer();
        const editor = await (0, tools_1.decodeImage)(data);
        editor.rotate(deg);
        const u8 = await editor.encode();
        const sent = Buffer.from(u8);
        res.setHeader("Content-Type", "image/png");
        res.send(sent);
    }
    else {
        (0, error_1.stop)(res, 400, "No image URL provided");
    }
}
exports.imageRotate = imageRotate;
