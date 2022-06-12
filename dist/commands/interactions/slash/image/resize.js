"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageResizeSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImageResizeSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "resize";
    description = "shrink or large";
    constructor() {
        super({
            options: [
                new baseslash_1.BaseImageOption(),
                {
                    name: "size",
                    description: "big.",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.resize;
}
exports.ImageResizeSlashSubCommand = ImageResizeSlashSubCommand;
