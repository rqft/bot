"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlGlitchSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class PxlGlitchSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "corrupt";
    description = "._.";
    constructor() {
        super({
            options: [
                {
                    name: "target",
                    description: "what to use (example: chunky)",
                    value: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    default: parameters_1.Parameters.Default.imageUrl(constants_1.ImageFormats.PNG),
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                },
                {
                    name: "corrupt strength",
                    description: "how corrupts bad",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                },
                {
                    name: "abuse",
                    description: "how much bad jpeg",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                },
                {
                    name: "gifc",
                    label: "gif-count",
                    description: "how many frames with?",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                },
                {
                    name: "gifd",
                    label: "gif-delay",
                    description: "how long each frame delaying",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                }
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.glitch;
}
exports.PxlGlitchSlashSubCommand = PxlGlitchSlashSubCommand;
