"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUpscaleSlashSubCommand = void 0;
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImageUpscaleSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "upscale";
    description = "make it huge";
    constructor() {
        super({
            options: [new baseslash_1.BaseImageOption()],
        });
    }
    run = formatter_1.Formatter.Image.upscale;
}
exports.ImageUpscaleSlashSubCommand = ImageUpscaleSlashSubCommand;
