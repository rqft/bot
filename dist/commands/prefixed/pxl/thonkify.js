"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class PxlThonkifyCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "pxl thonkify",
            aliases: ['pxl thonk'],
            metadata: (0, command_metadata_1.ImageMetadata)("why", "<query: string>"),
            type: [
                {
                    name: "text",
                    type: "string",
                    required: true,
                    consume: true
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.thonkify;
}
exports.default = PxlThonkifyCommand;
