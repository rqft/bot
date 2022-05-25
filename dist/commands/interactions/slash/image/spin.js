"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSpinSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class ImageSpinSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "spin";
    description = "you spin me right round baby right round like a record baby right round round round";
    constructor() {
        super({
            options: [
                {
                    name: "target",
                    description: "what to use",
                    value: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    default: parameters_1.Parameters.Default.imageUrl(constants_1.ImageFormats.PNG),
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.spin;
}
exports.ImageSpinSlashSubCommand = ImageSpinSlashSubCommand;
