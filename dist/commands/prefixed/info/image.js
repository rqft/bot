"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class InfoImageCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "info image",
            metadata: (0, command_metadata_1.ToolsMetadata)("emoji image", "<target: Image>"),
            type: [
                {
                    name: "target",
                    type: parameters_1.Parameters.imageUrl(),
                    default: parameters_1.Parameters.Default.imageUrl,
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Info.image;
}
exports.default = InfoImageCommand;
