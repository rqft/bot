"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageTintSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImageTintSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "tint";
    description = "make image colored";
    constructor() {
        super({
            options: [
                {
                    name: "color",
                    description: "what colour",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
                {
                    name: "opacity",
                    description: "how much",
                    type: constants_1.ApplicationCommandOptionTypes.NUMBER,
                    required: false,
                    minValue: 0,
                    maxValue: 100,
                },
                new baseslash_1.BaseImageOption(),
            ],
        });
    }
    run = formatter_1.Formatter.Image.tint;
}
exports.ImageTintSlashSubCommand = ImageTintSlashSubCommand;
