"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const pariah_1 = require("pariah");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class ImageMirrorCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "image mirror",
            metadata: (0, command_metadata_1.ImageMetadata)("mirror an image on itself", "<target: Image>"),
            type: [
                {
                    name: "target",
                    type: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    required: true,
                },
            ],
            args: [
                {
                    name: "method",
                    type: "string",
                    default: pariah_1.APIs.Jonathan.MirrorMethods.LEFT,
                    choices: Object.values(pariah_1.APIs.Jonathan.MirrorMethods),
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.mirror;
}
exports.default = ImageMirrorCommand;
