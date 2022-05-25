"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class TagExecCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "tag exec",
            aliases: ["t exec", "tag eval", "t eval", "tag test", "t test"],
            metadata: (0, command_metadata_1.ToolsMetadata)("exec tag script", "<script: string> ?<-args: Array<string>>"),
            type: [
                {
                    name: "script",
                    type: "string",
                    required: true,
                },
            ],
            args: [{ name: "args", type: parameters_1.Parameters.array(String), default: [] }],
        });
    }
    run = formatter_1.Formatter.Tag.exec;
}
exports.default = TagExecCommand;
