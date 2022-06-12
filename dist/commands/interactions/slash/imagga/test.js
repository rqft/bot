"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImaggaTextSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImaggaTextSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "text";
    description = "the images are talking to me";
    constructor() {
        super({
            options: [new baseslash_1.BaseImageOption(constants_1.ImageFormats.PNG)],
        });
    }
    run = formatter_1.Formatter.Imagga.readText;
}
exports.ImaggaTextSlashSubCommand = ImaggaTextSlashSubCommand;
