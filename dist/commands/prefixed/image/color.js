"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class ImageMirrorCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "image color",
            metadata: (0, command_metadata_1.ImageMetadata)("view funny colours", "<target: Image>"),
            type: [
                {
                    name: "color",
                    type: "string",
                    required: true,
                },
            ],
            args: [
                {
                    name: "size",
                    type: "string",
                    default: "512x512",
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.color;
}
exports.default = ImageMirrorCommand;
