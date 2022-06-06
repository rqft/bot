"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class ImageSpinCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "image spin",
            metadata: (0, command_metadata_1.ImageMetadata)("you spin me right round baby right round like a record baby right round round round", "<target: Image>", ["@insyri#7314", "insyri", "533757461706964993"]),
            type: [
                {
                    name: "target",
                    type: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.spin;
}
exports.default = ImageSpinCommand;
