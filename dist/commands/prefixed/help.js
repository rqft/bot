"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../tools/command-metadata");
const formatter_1 = require("../../tools/formatter");
const basecommand_1 = require("./basecommand");
class HelpCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "help",
            metadata: (0, command_metadata_1.ToolsMetadata)("get help", "?<query: string>", [
                "help",
                "search",
                "tag get",
            ]),
            type: [
                {
                    name: "query",
                    type: "string",
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.help;
}
exports.default = HelpCommand;
