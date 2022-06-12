"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSpinSlashSubCommand = void 0;
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImageSpinSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "spin";
    description = "you spin me right round baby right round like a record baby right round round round";
    constructor() {
        super({
            options: [new baseslash_1.BaseImageOption()],
        });
    }
    run = formatter_1.Formatter.Image.spin;
}
exports.ImageSpinSlashSubCommand = ImageSpinSlashSubCommand;
