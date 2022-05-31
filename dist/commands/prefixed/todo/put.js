"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class TodoPutCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "todo put",
            aliases: ["todo edit"],
            metadata: (0, command_metadata_1.ToolsMetadata)("add todo", "<id: number> <data: string>"),
            type: [
                {
                    name: "id",
                    type: "number",
                    required: true,
                },
                {
                    name: "data",
                    type: "string",
                    required: true,
                    consume: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Todo.put;
}
exports.default = TodoPutCommand;
