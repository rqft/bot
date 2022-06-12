"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlAjitSlashSubCommand = void 0;
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class PxlAjitSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "ajit";
    description = "put some guy on here";
    constructor() {
        super({
            options: [new baseslash_1.BaseImageOption()],
        });
    }
    run = formatter_1.Formatter.Pxl.ajit;
}
exports.PxlAjitSlashSubCommand = PxlAjitSlashSubCommand;
