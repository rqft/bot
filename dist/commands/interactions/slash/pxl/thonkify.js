"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlThonkifySlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class PxlThonkifySlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "thonkify";
    description = "thinking_face";
    constructor() {
        super({
            options: [
                {
                    name: "text",
                    description: "what",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.thonkify;
}
exports.PxlThonkifySlashSubCommand = PxlThonkifySlashSubCommand;
