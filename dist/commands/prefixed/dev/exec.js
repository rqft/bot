"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class ExecCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "exec",
            metadata: (0, command_metadata_1.ToolsMetadata)("run shell", "<code: string>"),
            type: [
                {
                    name: "code",
                    type: 'string',
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.exec;
}
exports.default = ExecCommand;
