"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageTiltSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImageTiltSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "tilt";
    description = "add spinny motion blur";
    constructor() {
        super({
            options: [
                new baseslash_1.BaseImageOption(),
                {
                    name: "amount",
                    description: "how much",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.tilt;
}
exports.ImageTiltSlashSubCommand = ImageTiltSlashSubCommand;
