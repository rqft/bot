"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const pariah_1 = require("pariah");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class PxlEyesCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "pxl snapchat",
            metadata: (0, command_metadata_1.ImageMetadata)("teenage white girl named brittany uses this", "<type: SnapchatFilter=random> <target: Image>"),
            type: [
                {
                    name: "filter",
                    type: "string",
                    choices: Object.values(pariah_1.APIs.PxlAPI.SnapchatFilters),
                    default: pariah_1.APIs.PxlAPI.SnapchatFilters.RANDOM,
                },
                {
                    name: "target",
                    type: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    default: parameters_1.Parameters.Default.imageUrl(constants_1.ImageFormats.PNG),
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.snapchat;
}
exports.default = PxlEyesCommand;
