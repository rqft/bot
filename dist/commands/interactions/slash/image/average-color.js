"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageAverageColorSlashSubCommand = void 0;
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImageAverageColorSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "average";
    description = "blend";
    constructor() {
        super({
            options: [new baseslash_1.BaseImageOption()],
        });
    }
    run = formatter_1.Formatter.Image.averageColor;
}
exports.ImageAverageColorSlashSubCommand = ImageAverageColorSlashSubCommand;
