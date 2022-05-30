"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mirror = exports.MirrorMethods = exports.imageFlop = void 0;
const error_1 = require("../models/error");
const node_fetch_1 = __importDefault(require("node-fetch"));
const tools_1 = require("../tools");
async function imageFlop(req, res) {
    const url = req.query.url;
    const method = req.query.method || MirrorMethods.LEFT;
    console.log(req.query);
    if (!(method in MirrorMethods)) {
        (0, error_1.stop)(res, 400, `Invalid method: ${method}`);
        return;
    }
    if (url) {
        const request = await (0, node_fetch_1.default)(url);
        const data = await request.buffer();
        let editor = await (0, tools_1.decodeImage)(data);
        editor = mirror(editor, method);
        const u8 = await editor.encode();
        const sent = Buffer.from(u8);
        res.setHeader("Content-Type", "image/png");
        res.send(sent);
    }
    else {
        (0, error_1.stop)(res, 400, "No image URL provided");
    }
}
exports.imageFlop = imageFlop;
var MirrorMethods;
(function (MirrorMethods) {
    MirrorMethods["LEFT"] = "LEFT";
    MirrorMethods["RIGHT"] = "RIGHT";
    MirrorMethods["TOP"] = "TOP";
    MirrorMethods["BOTTOM"] = "BOTTOM";
})(MirrorMethods = exports.MirrorMethods || (exports.MirrorMethods = {}));
function mirror(frame, method = MirrorMethods.LEFT) {
    for (let x = 1; x < frame.width; x++) {
        for (let y = 1; y < frame.height; y++) {
            switch (method) {
                case MirrorMethods.LEFT: {
                    const pixel = frame.getPixelAt(x, y);
                    frame.setPixelAt(frame.width - x, y, pixel);
                    break;
                }
                case MirrorMethods.RIGHT: {
                    const pixel = frame.getPixelAt(frame.width - x, y);
                    frame.setPixelAt(x, y, pixel);
                    break;
                }
                case MirrorMethods.TOP: {
                    const pixel = frame.getPixelAt(x, y);
                    frame.setPixelAt(x, frame.height - y, pixel);
                    break;
                }
                case MirrorMethods.BOTTOM: {
                    const pixel = frame.getPixelAt(x, frame.height - y);
                    frame.setPixelAt(x, y, pixel);
                    break;
                }
            }
        }
    }
    return frame;
}
exports.mirror = mirror;
