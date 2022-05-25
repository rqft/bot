"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class PxlEmojiMosaicCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "pxl emojimosaic",
            aliases: ["pxl mosaic"],
            metadata: (0, command_metadata_1.ImageMetadata)("emoji emoji emoji", "<target: Image> ?<-group-size: number=6> ?<-scale: boolean=true>"),
            type: [
                {
                    name: "target",
                    type: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    default: parameters_1.Parameters.Default.imageUrl(constants_1.ImageFormats.PNG),
                },
            ],
            args: [
                {
                    name: "group-size",
                    aliases: ["size"],
                    type: parameters_1.Parameters.number({ min: 6, max: 192 }),
                    default: 6,
                },
                {
                    name: "scale",
                    type: "bool",
                    default: true,
                }
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.emojiMosaic;
}
exports.default = PxlEmojiMosaicCommand;
