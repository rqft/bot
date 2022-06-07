"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class ImageTiltCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "image tilt",
            metadata: (0, command_metadata_1.ImageMetadata)("blurry spinny", "<target: Image> ?<amount: number>", [
                "@insyri#7314",
                "insyri",
                "insyri -amount 12",
                "533757461706964993 -amount 7",
            ]),
            type: [
                {
                    name: "target",
                    type: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    required: true,
                },
                {
                    name: "size",
                    type: "string",
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.resize;
}
exports.default = ImageTiltCommand;
