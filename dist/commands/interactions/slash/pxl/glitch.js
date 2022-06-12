"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlGlitchSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class PxlGlitchSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "glitch";
    description = "Illegal byte 0x56";
    constructor() {
        super({
            options: [
                new baseslash_1.BaseImageOption(),
                {
                    name: "iterations",
                    description: "how many",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                },
                {
                    name: "amount",
                    description: "how much",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                },
                {
                    name: "gif_count",
                    label: "gif-count",
                    description: "how many frames",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                },
                {
                    name: "gif_delay",
                    label: "gif-delay",
                    description: "how long each frame",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.glitch;
}
exports.PxlGlitchSlashSubCommand = PxlGlitchSlashSubCommand;
