"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlSonicSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class PxlSonicSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "sonic";
    description = "the fast man";
    constructor() {
        super({
            options: [
                {
                    name: "text",
                    description: "what",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.sonic;
}
exports.PxlSonicSlashSubCommand = PxlSonicSlashSubCommand;
