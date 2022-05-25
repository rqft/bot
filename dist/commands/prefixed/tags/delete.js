"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class TagDeleteCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "tag delete",
            aliases: ["t delete", "tag remove", "t remove"],
            metadata: (0, command_metadata_1.ToolsMetadata)("delete tag", "<key: string>"),
            type: [
                {
                    name: "key",
                    type: "string",
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Tag.remove;
}
exports.default = TagDeleteCommand;
