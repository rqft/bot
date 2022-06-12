"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUrlSlashSubCommand = void 0;
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImageUrlSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "url";
    description = "u can just use devtools idiot";
    constructor() {
        super({
            options: [new baseslash_1.BaseImageOption()],
        });
    }
    run = formatter_1.Formatter.Image.url;
}
exports.ImageUrlSlashSubCommand = ImageUrlSlashSubCommand;
