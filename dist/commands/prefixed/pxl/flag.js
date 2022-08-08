"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("@rqft/fetch");
const constants_1 = require("detritus-client/lib/constants");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class PxlFlagCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "pxl flag",
            metadata: (0, command_metadata_1.ImageMetadata)("stop being gay", "<type: FagType=gay> <target: Image>"),
            type: [
                {
                    name: "flag",
                    type: "string",
                    choices: Object.values(fetch_1.APIs.PxlAPI.Flags),
                    default: fetch_1.APIs.PxlAPI.Flags.GAY,
                },
                {
                    name: "target",
                    type: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    default: parameters_1.Parameters.Default.imageUrl(constants_1.ImageFormats.PNG),
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.flag;
}
exports.default = PxlFlagCommand;
