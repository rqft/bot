"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSaturationSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImageSaturationSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "saturation";
    description = "crisp";
    constructor() {
        super({
            options: [
                new baseslash_1.BaseImageOption(),
                {
                    name: "amount",
                    description: "how much",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                    minValue: 0,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.saturation;
}
exports.ImageSaturationSlashSubCommand = ImageSaturationSlashSubCommand;
