"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class ImaggaTagsCommand extends basecommand_1.BaseImageCommand {
    constructor(client) {
        super(client, {
            name: "imagga tags",
            metadata: (0, command_metadata_1.ImageMetadata)("what is this image", "<target: Image>"),
        }, constants_1.ImageFormats.PNG);
    }
    run = formatter_1.Formatter.Imagga.tags;
}
exports.default = ImaggaTagsCommand;
