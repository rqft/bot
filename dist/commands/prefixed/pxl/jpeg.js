"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class PxlJpegCommand extends basecommand_1.BaseImageCommand {
    constructor(client) {
        super(client, {
            name: "pxl jpeg",
            aliases: ["pxl jpg"],
            metadata: (0, command_metadata_1.ImageMetadata)("crunchy", "<target: Image> ?<-quality: number>"),
            args: [{ name: "quality", type: "number", required: false }],
        });
    }
    run = formatter_1.Formatter.Pxl.jpeg;
}
exports.default = PxlJpegCommand;
