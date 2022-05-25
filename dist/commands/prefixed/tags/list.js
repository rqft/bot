"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class TagListCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "tag list",
            aliases: ["t list", "tag ls", "t ls"],
            metadata: (0, command_metadata_1.ToolsMetadata)("list tags", "<key: string>"),
        });
    }
    run = formatter_1.Formatter.Tag.list;
}
exports.default = TagListCommand;
