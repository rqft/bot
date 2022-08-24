"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../tools/command-metadata");
const formatter_1 = require("../../tools/formatter");
const parameters_1 = require("../../tools/parameters");
const basecommand_1 = require("./basecommand");
class PingCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "graph",
            aliases: ["plot"],
            metadata: (0, command_metadata_1.ToolsMetadata)("desmos"),
            args: [
                {
                    name: "size",
                    default: 512,
                    type: parameters_1.Parameters.number({ min: 0, max: 2048 }),
                },
            ],
            type: [
                { name: "expr", required: true, type: parameters_1.Parameters.array(String, ";") },
            ],
        });
    }
    run = formatter_1.Formatter.graph;
}
exports.default = PingCommand;
