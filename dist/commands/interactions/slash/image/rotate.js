"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRotateSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImageRotateSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "rotate";
    description = "slant.";
    constructor() {
        super({
            options: [
                {
                    name: "degrees",
                    description: "shift",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: true,
                },
                new baseslash_1.BaseImageOption(),
            ],
        });
    }
    run = formatter_1.Formatter.Image.rotate;
}
exports.ImageRotateSlashSubCommand = ImageRotateSlashSubCommand;
