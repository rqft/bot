"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class PxlAjitCommand extends basecommand_1.BaseImageCommand {
    constructor(client) {
        super(client, {
            name: "pxl ajit",
            metadata: (0, command_metadata_1.ImageMetadata)("overlays this guy onto an image", "<target: Image>"),
        });
    }
    run = formatter_1.Formatter.Pxl.ajit;
}
exports.default = PxlAjitCommand;
