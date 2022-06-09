"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class ImageRotateCommand extends basecommand_1.BaseImageCommand {
    constructor(client) {
        super(client, {
            name: "image rotate",
            metadata: (0, command_metadata_1.ImageMetadata)("turn", "<target: Image> <degrees: number>", [
                "@insyri#7314 90",
                "insyri 45",
                "533757461706964993 120",
            ]),
            type: [
                {
                    name: "degrees",
                    type: "number",
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.rotate;
}
exports.default = ImageRotateCommand;
