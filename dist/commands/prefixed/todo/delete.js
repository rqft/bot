"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class TodoDeleteCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "todo delete",
            aliases: ["todo remove"],
            metadata: (0, command_metadata_1.ToolsMetadata)("delete todo", "<id: number>", ["1"]),
            type: [
                {
                    name: "id",
                    type: "string",
                    required: true,
                },
            ],
            args: [],
        });
    }
    run = formatter_1.Formatter.Todo.remove;
}
exports.default = TodoDeleteCommand;
