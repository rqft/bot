"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class UrbanCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "urban",
            metadata: (0, command_metadata_1.FunMetadata)("the funny dictionary", "<word: string>"),
            type: [{ name: "word", type: "string", consume: true }],
        });
    }
    run = formatter_1.Formatter.urban;
}
exports.default = UrbanCommand;
