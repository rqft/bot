"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUpscaleSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class ImageUpscaleSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "upscale";
    description = "make it huge";
    constructor() {
        super({
            options: [
                {
                    name: "target",
                    description: "what to use",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    value: parameters_1.Parameters.imageUrl(),
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.upscale;
}
exports.ImageUpscaleSlashSubCommand = ImageUpscaleSlashSubCommand;
