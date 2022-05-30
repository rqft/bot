"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageResize = void 0;
const imagescript_1 = require("imagescript/");
const node_fetch_1 = __importDefault(require("node-fetch"));
const error_1 = require("../models/error");
const tools_1 = require("../tools");
async function imageResize(req, res) {
    const url = req.query.url;
    let size = req.params.size;
    if (!size) {
        size = "1";
    }
    if (url) {
        const request = await (0, node_fetch_1.default)(url);
        const data = await request.buffer();
        const editor = await (0, tools_1.decodeImage)(data);
        switch (true) {
            case /^\d+x\d+$/.test(size): {
                const [width, height] = size.split("x").map(Number);
                editor.resize(width, height);
                break;
            }
            case /^x\d+$/.test(size): {
                const [, height] = size.split("x");
                editor.resize(imagescript_1.Image.RESIZE_AUTO, Number(height));
                break;
            }
            case /^\d+x$/.test(size): {
                const [width] = size.split("x");
                editor.resize(Number(width), imagescript_1.Image.RESIZE_AUTO);
                break;
            }
            case /^[\d.]+$/.test(size): {
                editor.scale(Number(size));
                break;
            }
            default: {
                (0, error_1.stop)(res, 400, `Invalid size: ${size}`);
                return;
            }
        }
        const u8 = await editor.encode();
        const sent = Buffer.from(u8);
        res.setHeader("Content-Type", "image/png");
        res.send(sent);
    }
    else {
        (0, error_1.stop)(res, 400, "No image URL provided");
    }
}
exports.imageResize = imageResize;
