"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class ImageFisheyeCommand extends basecommand_1.BaseImageCommand {
    constructor(client) {
        super(client, {
            name: "image fisheye",
            metadata: (0, command_metadata_1.ImageMetadata)("vignette", "<target: Image> <amount: 0-100=50>", ["@insyri#7314", "insyri 50", "533757461706964993 25"]),
            type: [
                {
                    name: "amount",
                    type: parameters_1.Parameters.number({ min: 0, max: 100 }),
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.fisheye;
}
exports.default = ImageFisheyeCommand;
