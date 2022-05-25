"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMirrorSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const image_flop_1 = require("../../../../api/routes/image.flop");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const tools_1 = require("../../../../tools/tools");
const baseslash_1 = require("../baseslash");
class ImageMirrorSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "mirror";
    description = "make image mirrored on self";
    constructor() {
        super({
            options: [
                {
                    name: "target",
                    description: "what to use",
                    value: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    default: parameters_1.Parameters.Default.imageUrl(constants_1.ImageFormats.PNG),
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                },
                {
                    name: "method",
                    description: "what way to start from",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                    choices: Object.entries(image_flop_1.MirrorMethods).map(([name, value]) => ({
                        name: (0, tools_1.toTitleCase)(name),
                        value,
                    })),
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.mirror;
}
exports.ImageMirrorSlashSubCommand = ImageMirrorSlashSubCommand;
