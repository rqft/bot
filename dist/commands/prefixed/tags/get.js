"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class TagGetCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "tag",
            aliases: ["t", "tag get", "t get"],
            priority: -1,
            metadata: (0, command_metadata_1.ToolsMetadata)("get tag", "<get: string> ?<-args: Array<string>>"),
            type: [
                {
                    name: "key",
                    type: "string",
                    required: true,
                },
            ],
            args: [{ name: "args", type: parameters_1.Parameters.array(String), default: [] }],
        });
    }
    run = formatter_1.Formatter.Tag.get;
}
exports.default = TagGetCommand;
