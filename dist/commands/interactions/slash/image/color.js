"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageColorSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class ImageColorSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "color";
    description = "pretty colors";
    constructor() {
        super({
            options: [
                {
                    name: "color",
                    description: "colorss :D",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
                {
                    name: "size",
                    description: "big.",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                }
            ],
        });
    }
    run = formatter_1.Formatter.Image.color;
}
exports.ImageColorSlashSubCommand = ImageColorSlashSubCommand;
