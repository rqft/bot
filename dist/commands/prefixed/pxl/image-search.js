"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class PxlImageSearchCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "pxl search image",
            metadata: (0, command_metadata_1.ImageMetadata)("why not just google it lol", "<query: string>"),
            type: [
                {
                    name: "query",
                    type: "string",
                    required: true,
                    consume: true
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.imageSearch;
}
exports.default = PxlImageSearchCommand;
