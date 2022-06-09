"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class ImageTintCommand extends basecommand_1.BaseImageCommand {
    constructor(client) {
        super(client, {
            name: "image tint",
            metadata: (0, command_metadata_1.ImageMetadata)("make people have the funny colours", "<target: Image> <color: Color> ?<-[opacity|o]: 0-100=50>", [
                "@insyri#7314 f8f",
                "insyri f8f",
                "insyri f8f 50",
                "533757461706964993 f8f 25",
            ]),
            type: [
                {
                    name: "color",
                    type: "string",
                    required: true,
                },
            ],
            args: [
                {
                    name: "opacity",
                    type: parameters_1.Parameters.number({ min: 0, max: 100 }),
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.tint;
}
exports.default = ImageTintCommand;
