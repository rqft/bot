"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class PxlJpegCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "pxl jpeg",
            aliases: ['pxl jpg'],
            metadata: (0, command_metadata_1.ImageMetadata)("crunchy", "<target: Image> ?<-quality: number>"),
            type: [
                {
                    name: "target",
                    type: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    default: parameters_1.Parameters.Default.imageUrl(constants_1.ImageFormats.PNG),
                },
            ],
            args: [{ name: "quality", type: "number", required: false }],
        });
    }
    run = formatter_1.Formatter.Pxl.jpeg;
}
exports.default = PxlJpegCommand;
