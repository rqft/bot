"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class TagSetCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "tag set",
            aliases: [
                "t set",
                "tag add",
                "t add",
                "tag create",
                "t create",
                "tag edit",
                "t edit",
            ],
            type: [
                {
                    name: "key",
                    type: "string",
                    required: true,
                },
                {
                    name: "value",
                    type: "string",
                    consume: true,
                },
            ],
            metadata: (0, command_metadata_1.ToolsMetadata)("set a tag", "<key: string> <value: string>"),
        });
    }
    run = formatter_1.Formatter.Tag.post;
}
exports.default = TagSetCommand;
