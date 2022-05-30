"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSpin = exports.MAX_IMAGE_SIZE = void 0;
const imagescript_1 = require("imagescript");
const node_fetch_1 = __importDefault(require("node-fetch"));
const error_1 = require("../models/error");
const tools_1 = require("../tools");
exports.MAX_IMAGE_SIZE = 256;
async function imageSpin(req, res) {
    const url = req.query.url;
    if (url) {
        const request = await (0, node_fetch_1.default)(url);
        const data = await request.buffer();
        const editor = await (0, tools_1.decodeImage)(data);
        editor.resize(exports.MAX_IMAGE_SIZE, exports.MAX_IMAGE_SIZE);
        editor.cropCircle();
        const composite = [];
        for (let i = 0; i < 360; i += 15) {
            const frame = editor.clone();
            frame.rotate(i, false);
            composite.push(imagescript_1.Frame.from(frame, undefined, undefined, undefined, imagescript_1.Frame.DISPOSAL_BACKGROUND));
        }
        const gif = new imagescript_1.GIF(composite);
        const u8 = await gif.encode();
        const sent = Buffer.from(u8);
        res.setHeader("Content-Type", "image/gif");
        res.send(sent);
    }
    else {
        (0, error_1.stop)(res, 400, "No image URL provided");
    }
}
exports.imageSpin = imageSpin;
