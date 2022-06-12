"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImaggaTagsSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImaggaTagsSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "tags";
    description = "wtf is this image";
    constructor() {
        super({
            options: [new baseslash_1.BaseImageOption(constants_1.ImageFormats.PNG)],
        });
    }
    run = formatter_1.Formatter.Imagga.tags;
}
exports.ImaggaTagsSlashSubCommand = ImaggaTagsSlashSubCommand;
