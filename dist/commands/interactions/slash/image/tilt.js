"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageTiltSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class ImageTiltSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "tilt";
    description = "add spinny motion blur";
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
                {
                    name: "amount",
                    description: "how much",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.rotate;
}
exports.ImageTiltSlashSubCommand = ImageTiltSlashSubCommand;
