"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pariah_1 = require("pariah");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class ImageGenerateCommand extends basecommand_1.BaseCommand {
    expensive = true;
    constructor(client) {
        super(client, {
            name: "image generate",
            metadata: (0, command_metadata_1.ImageMetadata)("ai", "<target: Image> <degrees: number>", [
                "avocado",
            ]),
            type: [
                {
                    name: "query",
                    type: "string",
                    required: true,
                },
            ],
            args: [
                {
                    name: "style",
                    type: "string",
                    choices: Object.keys(pariah_1.APIs.Jonathan.WomboStyles),
                    default: "none",
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.generate;
}
exports.default = ImageGenerateCommand;
