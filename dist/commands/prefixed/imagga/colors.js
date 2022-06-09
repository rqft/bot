"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class ImaggaColorsCommand extends basecommand_1.BaseImageCommand {
    constructor(client) {
        super(client, {
            name: "imagga colors",
            aliases: ["imagga color"],
            metadata: (0, command_metadata_1.ImageMetadata)("what colors is this image of", "<target: Image>"),
        });
    }
    run = formatter_1.Formatter.Imagga.colors;
}
exports.default = ImaggaColorsCommand;
