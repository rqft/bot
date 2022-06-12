"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlLegoSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class PxlLegoSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "lego";
    description = "leggo my lego";
    constructor() {
        super({
            options: [
                new baseslash_1.BaseImageOption(),
                {
                    name: "group_size",
                    label: "group-size",
                    description: "how big",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                },
                {
                    name: "scale",
                    description: "resize now",
                    type: constants_1.ApplicationCommandOptionTypes.BOOLEAN,
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.lego;
}
exports.PxlLegoSlashSubCommand = PxlLegoSlashSubCommand;
