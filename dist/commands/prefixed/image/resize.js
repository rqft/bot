"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class ImageResizeCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "image resize",
            metadata: (0, command_metadata_1.ImageMetadata)("make small", "<target: Image> ?<size: string>", [
                "@insyri#7314 256x256",
                "insyri 256x",
                "insyri 2",
                "533757461706964993 x256",
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
exports.default = ImageResizeCommand;
