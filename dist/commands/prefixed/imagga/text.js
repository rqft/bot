"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class ImaggaTextCommand extends basecommand_1.BaseImageCommand {
    constructor(client) {
        super(client, {
            name: "imagga text",
            metadata: (0, command_metadata_1.ImageMetadata)("what is this image saying bro", "<target: Image>"),
        });
    }
    run = formatter_1.Formatter.Imagga.readText;
}
exports.default = ImaggaTextCommand;
