"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlJpegSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class PxlJpegSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "jpeg";
    description = "bad quality";
    constructor() {
        super({
            options: [
                new baseslash_1.BaseImageOption(),
                {
                    name: "quality",
                    description: "how bad",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.jpeg;
}
exports.PxlJpegSlashSubCommand = PxlJpegSlashSubCommand;
