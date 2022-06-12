"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSlashSubCommand = void 0;
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImageSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "image";
    description = "image info";
    constructor() {
        super({
            options: [new baseslash_1.BaseImageOption()],
        });
    }
    run = formatter_1.Formatter.Info.image;
}
exports.ImageSlashSubCommand = ImageSlashSubCommand;
