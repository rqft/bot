"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageColor = void 0;
const imagescript_1 = require("imagescript/");
const error_1 = require("../models/error");
async function imageColor(req, res) {
    let [width, height] = (req.params.size || "512x512")
        .split("x")
        .map((x) => Number.parseInt(x));
    if (!width && !height) {
        (0, error_1.stop)(res, 400, "Invalid image size");
    }
    else if (!width) {
        width = height;
    }
    else if (!height) {
        height = width;
    }
    let color = req.params.color;
    if (color) {
        if (color.startsWith("#")) {
            color = color.slice(1);
        }
        switch (color.length) {
            case 3: {
                const [r, g, b] = color.split("");
                color = r + r + g + g + b + b + "ff";
                break;
            }
            case 4: {
                const [r, g, b, a] = color.split("");
                color = r + r + g + g + b + b + a + a;
                break;
            }
            case 6: {
                color = color + "ff";
                break;
            }
            case 8: {
                break;
            }
            default: {
                (0, error_1.stop)(res, 400, "Invalid hex code");
            }
        }
        const int = parseInt(color, 16);
        const editor = new imagescript_1.Image(Number(width), Number(height)).fill(int);
        const u8 = await editor.encode();
        const sent = Buffer.from(u8);
        res.setHeader("Content-Type", "image/png");
        res.send(sent);
    }
    else {
        (0, error_1.stop)(res, 400, "No color provided");
    }
}
exports.imageColor = imageColor;
