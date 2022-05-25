"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class TagInspectCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "tag inspect",
            aliases: ["t inspect"],
            metadata: (0, command_metadata_1.ToolsMetadata)("see tags file"),
        });
    }
    run = formatter_1.Formatter.Tag.inspect;
}
exports.default = TagInspectCommand;
